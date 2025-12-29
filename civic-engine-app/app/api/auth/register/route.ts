import { NextRequest, NextResponse } from 'next/server';
import { signUp, type SignUpInput } from '@/lib/auth/cognito-client';
import { createUser, createTeacherProfile } from '@/lib/db/repositories';
import type { GradeLevel } from '@/types/education';

interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
  role: 'teacher' | 'student';
  schoolName?: string;
  state?: string;
  gradeLevels?: GradeLevel[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.password || !body.displayName || !body.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Teachers must provide school info
    if (body.role === 'teacher' && (!body.schoolName || !body.state)) {
      return NextResponse.json(
        { error: 'Teachers must provide school name and state' },
        { status: 400 }
      );
    }

    // Sign up with Cognito
    const signUpInput: SignUpInput = {
      email: body.email,
      password: body.password,
      role: body.role,
      schoolName: body.schoolName,
      state: body.state,
    };

    const { userSub } = await signUp(signUpInput);

    // Create user record in DynamoDB
    await createUser({
      id: userSub,
      email: body.email,
      displayName: body.displayName,
      role: body.role,
    });

    // Create teacher profile if applicable
    if (body.role === 'teacher' && body.schoolName && body.state) {
      await createTeacherProfile({
        userId: userSub,
        schoolName: body.schoolName,
        state: body.state,
        gradeLevels: body.gradeLevels || [],
      });
    }

    return NextResponse.json({
      message: 'Registration successful. Please check your email to verify your account.',
      userId: userSub,
    });
  } catch (error) {
    console.error('Registration error:', error);

    const message = error instanceof Error ? error.message : 'Registration failed';

    // Handle specific Cognito errors
    if (message.includes('UsernameExistsException')) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    if (message.includes('InvalidPasswordException')) {
      return NextResponse.json(
        { error: 'Password does not meet requirements' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
