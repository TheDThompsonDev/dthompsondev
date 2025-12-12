import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
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

        try {
            const segmentId = process.env.RESEND_SEGEMENT_ID;
            console.log('Creating contact with email:', email, 'segmentId:', segmentId);

            const { data, error } = await resend.contacts.create({
                email: email,
                unsubscribed: false,
                ...(segmentId && { segmentId }),
            });

            console.log('Resend response - data:', data, 'error:', error);

            if (error) {
                console.error('Resend API Error:', JSON.stringify(error, null, 2));
                return NextResponse.json(
                    { error: 'Failed to subscribe' },
                    { status: 500 }
                );
            }

            return NextResponse.json({ success: true, data });
        } catch (error) {
            console.error('Unexpected Error:', error);
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
