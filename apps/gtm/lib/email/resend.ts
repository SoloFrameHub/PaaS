import { Resend } from 'resend';
import { randomInt } from 'crypto';

let resend: Resend | null = null;

export function getResend(): Resend {
  if (!resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY not set');
    resend = new Resend(key);
  }
  return resend;
}

export function generateVerificationCode(): string {
  return randomInt(100000, 999999).toString();
}

export async function sendVerificationCode(email: string, code: string): Promise<void> {
  const r = getResend();
  const { error } = await r.emails.send({
    from: 'SoloFrameHub <noreply@mail.soloframehub.com>',
    to: email,
    subject: 'Your verification code',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="margin-bottom: 16px;">Verify your email</h2>
        <p style="color: #555; margin-bottom: 24px;">Enter this code to verify your SoloFrameHub account:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 24px; background: #f5f5f5; border-radius: 8px; margin-bottom: 24px;">
          ${code}
        </div>
        <p style="color: #888; font-size: 14px;">This code expires in 15 minutes. If you didn't sign up, ignore this email.</p>
      </div>
    `,
  });
  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}

export async function sendPasswordResetCode(email: string, code: string): Promise<void> {
  const r = getResend();
  const { error } = await r.emails.send({
    from: 'SoloFrameHub <noreply@mail.soloframehub.com>',
    to: email,
    subject: 'Your password reset code',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="margin-bottom: 16px;">Reset your password</h2>
        <p style="color: #555; margin-bottom: 24px;">Enter this code to reset your SoloFrameHub password:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 24px; background: #f5f5f5; border-radius: 8px; margin-bottom: 24px;">
          ${code}
        </div>
        <p style="color: #888; font-size: 14px;">This code expires in 15 minutes. If you didn't request a password reset, ignore this email.</p>
      </div>
    `,
  });
  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
}
