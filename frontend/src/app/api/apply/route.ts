import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || SMTP_USER;
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

// Rate limiting: max 3 submissions per IP per 10 minutes
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MIN_FORM_TIME = 3000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const formData = await request.formData();

    // Honeypot
    const hp = formData.get('_hp') as string | null;
    if (hp) {
      return NextResponse.json({ success: true });
    }

    // Timestamp check
    const ts = formData.get('_ts') as string | null;
    if (ts && Date.now() - Number(ts) < MIN_FORM_TIME) {
      return NextResponse.json({ success: true });
    }

    // Turnstile verification
    const turnstileToken = formData.get('_turnstile') as string | null;
    if (turnstileToken) {
      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET,
          response: turnstileToken,
          remoteip: ip,
        }),
      });
      const turnstileData = await turnstileRes.json() as { success: boolean };
      if (!turnstileData.success) {
        return NextResponse.json({ error: 'Captcha verification failed' }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: 'Captcha required' }, { status: 400 });
    }

    // Extract fields
    const fullName = (formData.get('fullName') as string || '').trim();
    const document = (formData.get('document') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();
    const area = (formData.get('area') as string || '').trim();
    const experience = (formData.get('experience') as string || '').trim();
    const motivation = (formData.get('motivation') as string || '').trim();
    const resume = formData.get('resume') as File | null;

    // Required fields
    if (!fullName || !document || !email || !phone || !area || !motivation || !resume) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Length limits
    if (fullName.length > 200 || document.length > 50 || email.length > 320 || phone.length > 30 || area.length > 100 || experience.length > 3000 || motivation.length > 3000) {
      return NextResponse.json({ error: 'Field length exceeds maximum' }, { status: 400 });
    }

    // File validation
    if (resume.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File exceeds 1MB limit' }, { status: 400 });
    }

    if (!SMTP_USER || !SMTP_PASSWORD) {
      console.error('SMTP credentials not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const fileBuffer = Buffer.from(await resume.arrayBuffer());

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    await transporter.sendMail({
      from: `"Fundacion Cigarra Web" <${SMTP_USER}>`,
      to: CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `[Hoja de Vida] ${fullName} — ${area}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #1a5632 0%, #22753f 100%); padding: 32px 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">Nueva postulacion al equipo</h2>
            <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">Recibido desde fundacioncigarra.org</p>
          </div>

          <div style="padding: 32px 24px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; width: 140px; font-size: 14px; vertical-align: top;">Nombre completo</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px;">${escapeHtml(fullName)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; font-size: 14px; vertical-align: top;">Documento</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px;">${escapeHtml(document)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; font-size: 14px; vertical-align: top;">Email</td>
                  <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #1a5632; text-decoration: none; font-weight: 500;">${escapeHtml(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; font-size: 14px; vertical-align: top;">Telefono</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px;">${escapeHtml(phone)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; font-size: 14px; vertical-align: top;">Area de interes</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 500;">${escapeHtml(area)}</td>
                </tr>
              </table>
            </div>

            ${experience ? `
            <div style="border-left: 3px solid #1a5632; padding-left: 16px; margin-bottom: 20px;">
              <p style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Experiencia</p>
              <div style="color: #111827; white-space: pre-wrap; line-height: 1.7; font-size: 14px;">${escapeHtml(experience)}</div>
            </div>
            ` : ''}

            <div style="border-left: 3px solid #d97706; padding-left: 16px; margin: 0;">
              <p style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Motivacion</p>
              <div style="color: #111827; white-space: pre-wrap; line-height: 1.7; font-size: 14px;">${escapeHtml(motivation)}</div>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #ecfdf5; border-radius: 8px; text-align: center;">
              <p style="color: #065f46; font-size: 14px; font-weight: 600; margin: 0;">Hoja de vida adjunta (PDF)</p>
              <p style="color: #047857; font-size: 13px; margin: 4px 0 0;">${escapeHtml(resume.name)} — ${(resume.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>

          <div style="padding: 16px 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
              Enviado el ${new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: resume.name,
          content: fileBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send application email:', error);
    return NextResponse.json({ error: 'Failed to send application' }, { status: 500 });
  }
}
