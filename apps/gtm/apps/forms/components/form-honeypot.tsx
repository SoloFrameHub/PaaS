'use client';

interface HoneypotProps {
  value: string;
  onChange: (value: string) => void;
}

/** Hidden honeypot field — positioned off-screen. If filled, submission is silently rejected. */
export default function FormHoneypot({ value, onChange }: HoneypotProps) {
  return (
    <div style={{ position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
      <label htmlFor="_hp_email_confirm">Do not fill this out</label>
      <input
        type="text"
        id="_hp_email_confirm"
        name="_hp_email_confirm"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
