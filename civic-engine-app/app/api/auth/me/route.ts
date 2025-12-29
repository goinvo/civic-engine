import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, isTeacher } from '@/lib/auth/verify-token';
import { getUserById, getTeacherProfile, getStudentCohorts } from '@/lib/db/repositories';

export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await getUserById(authUser.userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get additional profile info based on role
    let profile = null;

    if (isTeacher(authUser)) {
      profile = await getTeacherProfile(authUser.userId);
    } else {
      // Get student's cohorts
      const cohorts = await getStudentCohorts(authUser.userId);
      profile = { cohorts };
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      },
      profile,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}
