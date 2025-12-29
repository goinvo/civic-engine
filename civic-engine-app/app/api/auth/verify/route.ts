import { NextRequest, NextResponse } from 'next/server';
import { confirmSignUp } from '@/lib/auth/cognito-client';

interface VerifyRequest {
  email: string;
  code: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyRequest = await request.json();

    if (!body.email || !body.code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    await confirmSignUp(body.email, body.code);

    return NextResponse.json({
      message: 'Email verified successfully. You can now log in.',
    });
  } catch (error) {
    console.error('Verification error:', error);

    const message = error instanceof Error ? error.message : 'Verification failed';

    if (message.includes('CodeMismatchException')) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    if (message.includes('ExpiredCodeException')) {
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
