import { NextResponse } from 'next/server';

const API_KEY = process.env.MAILCHIMP_API_KEY || '';
const LIST_ID = process.env.MAILCHIMP_LIST_ID || '';
const DC = API_KEY.split('-').pop() || 'us18';

// Rate limiting: max 5 subscriptions per IP per 10 minutes
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

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
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as { email?: string };

    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      );
    }

    if (!API_KEY || !LIST_ID) {
      console.error('Mailchimp credentials not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 },
      );
    }

    const res = await fetch(
      `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: body.email,
          status: 'subscribed',
        }),
      },
    );

    const data = (await res.json()) as { status?: string; title?: string; detail?: string };

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    // Already subscribed
    if (data.title === 'Member Exists') {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    console.error('Mailchimp error:', data);
    return NextResponse.json(
      { error: data.detail || 'Subscription failed' },
      { status: 400 },
    );
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
