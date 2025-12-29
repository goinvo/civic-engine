import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, isStudent } from '@/lib/auth/verify-token';
import {
  getCohortByJoinCode,
  getStudentProfile,
  createStudentProfile,
  incrementStudentCount,
  addUserToGroup,
} from '@/lib/db/repositories';
import { getUserById, updateUser } from '@/lib/db/repositories';

// GET /api/join/[joinCode] - Validate join code
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ joinCode: string }> }
) {
  try {
    const { joinCode } = await params;
    const cohort = await getCohortByJoinCode(joinCode.toUpperCase());

    if (!cohort) {
      return NextResponse.json(
        { error: 'Invalid join code' },
        { status: 404 }
      );
    }

    if (cohort.status === 'archived') {
      return NextResponse.json(
        { error: 'This class is no longer accepting students' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      cohort: {
        id: cohort.id,
        name: cohort.name,
        gradeLevel: cohort.gradeLevel,
      },
    });
  } catch (error) {
    console.error('Validate join code error:', error);
    return NextResponse.json(
      { error: 'Failed to validate join code' },
      { status: 500 }
    );
  }
}

interface JoinCohortRequest {
  displayName?: string;
}

// POST /api/join/[joinCode] - Join cohort as student
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ joinCode: string }> }
) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { joinCode } = await params;
    const body: JoinCohortRequest = await request.json().catch(() => ({}));

    const cohort = await getCohortByJoinCode(joinCode.toUpperCase());

    if (!cohort) {
      return NextResponse.json(
        { error: 'Invalid join code' },
        { status: 404 }
      );
    }

    if (cohort.status === 'archived') {
      return NextResponse.json(
        { error: 'This class is no longer accepting students' },
        { status: 400 }
      );
    }

    // Check if already joined
    const existingProfile = await getStudentProfile(authUser.userId, cohort.id);
    if (existingProfile) {
      return NextResponse.json(
        { error: 'You have already joined this class' },
        { status: 400 }
      );
    }

    // Update user display name if provided
    if (body.displayName) {
      await updateUser(authUser.userId, { displayName: body.displayName });
    }

    // Create student profile for this cohort
    await createStudentProfile({
      userId: authUser.userId,
      cohortId: cohort.id,
    });

    // Increment cohort student count
    await incrementStudentCount(cohort.id);

    // Add user to students group (if not already)
    try {
      await addUserToGroup(authUser.userId, 'students');
    } catch {
      // Ignore if already in group
    }

    return NextResponse.json({
      message: 'Successfully joined the class',
      cohort: {
        id: cohort.id,
        name: cohort.name,
        gradeLevel: cohort.gradeLevel,
        currentPhase: cohort.currentPhase,
      },
    });
  } catch (error) {
    console.error('Join cohort error:', error);
    return NextResponse.json(
      { error: 'Failed to join class' },
      { status: 500 }
    );
  }
}
