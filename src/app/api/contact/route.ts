import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkBotId } from 'botid/server';

// Inline escapeHtml to avoid importing from sanitize.ts which uses isomorphic-dompurify
// (can cause issues in Vercel serverless environment)
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Explicitly handle GET requests with a proper JSON 405 response
export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed. Use POST to submit the contact form.' },
    { status: 405, headers: { 'Allow': 'POST, OPTIONS' } }
  );
}

export async function POST(request: NextRequest) {
  try {
    // Verify BotID challenge - blocks bots from submitting
    const botIdResult = await checkBotId();
    if (botIdResult.isBot) {
      return NextResponse.json(
        { error: 'Bot detected. Please try again.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, company, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize user inputs to prevent XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : '';
    const safeMessage = escapeHtml(message);

    // Send email using Resend
    // IMPORTANT: In production, you MUST use a verified domain in the 'from' field
    // Set RESEND_FROM_EMAIL env var to something like: 'Contact Form <contact@yourdomain.com>'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Contact Form <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: process.env.CONTACT_EMAIL || 'your-email@example.com', // Your email
      replyTo: email,
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #153230;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
            ${safeCompany ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${safeCompany}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #153230;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e2e2; margin: 30px 0;" />
          
          <p style="color: #666; font-size: 12px;">
            This message was sent from your website contact form.
          </p>
        </div>
      `,
    });

    // Check if there was an error from Resend
    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Log success for debugging
    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

