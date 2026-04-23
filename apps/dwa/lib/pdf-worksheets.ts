'use client';

import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, PDFTextField } from 'pdf-lib';

// ── Public Types ──

export interface WorksheetField {
    id: string;
    label: string;
    type: 'text' | 'multiline' | 'number' | 'rating' | 'checkbox';
    value?: string;
    height?: number;
}

export interface WorksheetConfig {
    title: string;
    subtitle?: string;
    instructions?: string;
    disclaimer?: string;
    fields: WorksheetField[];
}

// ── Layout Constants ──

const PAGE_WIDTH = 612;   // US Letter
const PAGE_HEIGHT = 792;
const MARGIN = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FIELD_GAP = 8;
const LINE_HEIGHT = 14;

const COLORS = {
    title: rgb(0.1, 0.1, 0.1),
    subtitle: rgb(0.3, 0.3, 0.3),
    label: rgb(0.15, 0.15, 0.15),
    disclaimer: rgb(0.45, 0.45, 0.45),
    fieldBorder: rgb(0.7, 0.7, 0.7),
    fieldBg: rgb(0.97, 0.97, 0.97),
};

// ── PDF Generation ──

export async function generateWorksheetPdf(config: WorksheetConfig): Promise<Uint8Array> {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

    let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = PAGE_HEIGHT - MARGIN;

    // Helper: add a new page if running out of space
    function ensureSpace(needed: number) {
        if (y - needed < MARGIN + 30) {
            page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
            y = PAGE_HEIGHT - MARGIN;
        }
    }

    // ── Header ──
    page.drawText(config.title, {
        x: MARGIN, y, size: 18, font: fontBold, color: COLORS.title,
    });
    y -= 24;

    if (config.subtitle) {
        page.drawText(config.subtitle, {
            x: MARGIN, y, size: 11, font, color: COLORS.subtitle,
        });
        y -= 18;
    }

    // Date line
    const dateStr = `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    page.drawText(dateStr, {
        x: MARGIN, y, size: 10, font, color: COLORS.subtitle,
    });
    y -= 20;

    // Instructions
    if (config.instructions) {
        const instrLines = wrapText(config.instructions, font, 10, CONTENT_WIDTH);
        for (const line of instrLines) {
            ensureSpace(LINE_HEIGHT);
            page.drawText(line, {
                x: MARGIN, y, size: 10, font, color: COLORS.subtitle,
            });
            y -= LINE_HEIGHT;
        }
        y -= 8;
    }

    // Separator
    ensureSpace(10);
    page.drawLine({
        start: { x: MARGIN, y },
        end: { x: PAGE_WIDTH - MARGIN, y },
        thickness: 0.5,
        color: COLORS.fieldBorder,
    });
    y -= 16;

    // ── Form Fields ──
    const form = doc.getForm();

    for (const field of config.fields) {
        const fieldHeight = field.type === 'multiline' ? (field.height ?? 80) : 22;
        const totalHeight = LINE_HEIGHT + FIELD_GAP + fieldHeight;

        ensureSpace(totalHeight + 12);

        // Label
        const labelLines = wrapText(field.label, fontBold, 10, CONTENT_WIDTH);
        for (const line of labelLines) {
            page.drawText(line, {
                x: MARGIN, y, size: 10, font: fontBold, color: COLORS.label,
            });
            y -= LINE_HEIGHT;
        }
        y -= FIELD_GAP / 2;

        if (field.type === 'checkbox') {
            // Checkbox
            const checkbox = form.createCheckBox(field.id);
            checkbox.addToPage(page, {
                x: MARGIN,
                y: y - 14,
                width: 14,
                height: 14,
                borderColor: COLORS.fieldBorder,
                backgroundColor: COLORS.fieldBg,
            });
            if (field.value === 'true' || field.value === 'Yes') {
                checkbox.check();
            }
            y -= 14 + FIELD_GAP;
        } else {
            // Text field (single-line or multiline)
            const textField = form.createTextField(field.id);
            textField.addToPage(page, {
                x: MARGIN,
                y: y - fieldHeight,
                width: CONTENT_WIDTH,
                height: fieldHeight,
                borderColor: COLORS.fieldBorder,
                backgroundColor: COLORS.fieldBg,
            });

            if (field.type === 'multiline') {
                textField.enableMultiline();
            }

            if (field.value) {
                textField.setText(field.value);
            }

            setTextFieldFont(textField, font);
            y -= fieldHeight + FIELD_GAP;
        }
    }

    // ── Disclaimer ──
    if (config.disclaimer) {
        ensureSpace(40);
        y -= 12;
        page.drawLine({
            start: { x: MARGIN, y },
            end: { x: PAGE_WIDTH - MARGIN, y },
            thickness: 0.5,
            color: COLORS.fieldBorder,
        });
        y -= 14;
        const discLines = wrapText(config.disclaimer, font, 8, CONTENT_WIDTH);
        for (const line of discLines) {
            ensureSpace(12);
            page.drawText(line, {
                x: MARGIN, y, size: 8, font, color: COLORS.disclaimer,
            });
            y -= 12;
        }
    }

    return doc.save();
}

// ── Download Helper ──

export function downloadPdf(bytes: Uint8Array, filename: string) {
    const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ── Text Wrapping ──

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';

    for (const word of words) {
        const test = current ? `${current} ${word}` : word;
        const width = font.widthOfTextAtSize(test, fontSize);
        if (width > maxWidth && current) {
            lines.push(current);
            current = word;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);
    return lines;
}

// ── Helpers ──

function setTextFieldFont(field: PDFTextField, font: PDFFont) {
    try {
        field.defaultUpdateAppearances(font);
    } catch {
        // Fallback — some pdf-lib versions handle this differently
    }
}
