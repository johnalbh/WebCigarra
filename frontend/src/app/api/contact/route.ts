import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  _hp?: string;      // honeypot
  _ts?: number;       // form load timestamp
  _turnstile?: string; // Turnstile token
}

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.office365.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || SMTP_USER;
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

// Rate limiting: max 3 submissions per IP per 10 minutes
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Minimum time (ms) a human needs to fill the form (3 seconds)
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

export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as ContactBody;

    // Honeypot check: if filled, it's a bot
    if (body._hp) {
      // Silently succeed to not tip off bots
      return NextResponse.json({ success: true });
    }

    // Timestamp check: form filled too fast = bot
    if (body._ts && Date.now() - body._ts < MIN_FORM_TIME) {
      return NextResponse.json({ success: true });
    }

    // Turnstile verification
    if (body._turnstile) {
      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET,
          response: body._turnstile,
          remoteip: ip,
        }),
      });
      const turnstileData = await turnstileRes.json() as { success: boolean };
      if (!turnstileData.success) {
        return NextResponse.json(
          { error: 'Captcha verification failed' },
          { status: 400 },
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Captcha required' },
        { status: 400 },
      );
    }

    // Required field validation
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Email format validation
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      );
    }

    // Length limits to prevent abuse
    if (body.name.length > 200 || body.subject.length > 300 || body.message.length > 5000 || body.email.length > 320) {
      return NextResponse.json(
        { error: 'Field length exceeds maximum' },
        { status: 400 },
      );
    }

    if (!SMTP_USER || !SMTP_PASSWORD) {
      console.error('SMTP credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 },
      );
    }

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
      replyTo: body.email,
      subject: `[Contacto Web] ${body.subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background-color: #1a5632; padding: 32px 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 22px; font-weight: 600;">Nuevo mensaje de contacto</h2>
            <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">Recibido desde fundacioncigarra.org</p>
          </div>

          <div style="padding: 32px 24px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; width: 110px; font-size: 14px; vertical-align: top;">Nombre</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px;">${escapeHtml(body.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; font-size: 14px; vertical-align: top;">Email</td>
                  <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${escapeHtml(body.email)}" style="color: #1a5632; text-decoration: none; font-weight: 500;">${escapeHtml(body.email)}</a></td>
                </tr>
                ${body.phone ? `
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; font-size: 14px; vertical-align: top;">Telefono</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px;">${escapeHtml(body.phone)}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 10px 0; font-weight: 600; color: #374151; font-size: 14px; vertical-align: top;">Asunto</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 500;">${escapeHtml(body.subject)}</td>
                </tr>
              </table>
            </div>

            <div style="border-left: 3px solid #1a5632; padding-left: 16px; margin: 0;">
              <p style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Mensaje</p>
              <div style="color: #111827; white-space: pre-wrap; line-height: 1.7; font-size: 14px;">${escapeHtml(body.message)}</div>
            </div>
          </div>

          <div style="padding: 16px 24px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
              Enviado el ${new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      `,
    });

    // Also save to Strapi if available (non-blocking)
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (strapiUrl) {
      fetch(`${strapiUrl}/api/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { name: body.name, email: body.email, phone: body.phone, subject: body.subject, message: body.message } }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
