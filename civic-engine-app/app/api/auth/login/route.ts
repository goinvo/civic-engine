import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/auth/cognito-client';

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const tokens = await signIn({
      email: body.email,
      password: body.password,
    });

    return NextResponse.json({
      accessToken: tokens.accessToken,
      idToken: tokens.idToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
    });
  } catch (error) {
    console.error('Login error:', error);

    const message = error instanceof Error ? error.message : 'Login failed';

    // Handle specific Cognito errors
    if (message.includes('NotAuthorizedException')) {
      return NextResponse.json(
        { error: 'Incorrect email or password' },
        { status: 401 }
      );
    }

    if (message.includes('UserNotFoundException')) {
      return NextResponse.json(
        { error: 'Incorrect email or password' },
        { status: 401 }
      );
    }

    if (message.includes('UserNotConfirmedException')) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in' },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
