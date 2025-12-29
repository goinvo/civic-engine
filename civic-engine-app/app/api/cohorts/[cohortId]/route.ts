import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, isTeacher } from '@/lib/auth/verify-token';
import {
  getCohortById,
  updateCohort,
  getStudentsInCohort,
  advancePhase,
} from '@/lib/db/repositories';
import type { CohortStatus, CohortPhase } from '@/types/education';

interface UpdateCohortRequest {
  name?: string;
  status?: CohortStatus;
}

// GET /api/cohorts/[cohortId] - Get cohort details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cohortId: string }> }
) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { cohortId } = await params;
    const cohort = await getCohortById(cohortId);

    if (!cohort) {
      return NextResponse.json({ error: 'Cohort not found' }, { status: 404 });
    }

    // Teachers can only view their own cohorts
    if (isTeacher(authUser) && cohort.teacherId !== authUser.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get students in cohort (for teachers)
    let students = null;
    if (isTeacher(authUser)) {
      const studentProfiles = await getStudentsInCohort(cohortId);
      students = studentProfiles.map((s) => ({
        userId: s.userId,
        joinedAt: s.joinedAt.toISOString(),
      }));
    }

    return NextResponse.json({
      cohort: {
        id: cohort.id,
        name: cohort.name,
        gradeLevel: cohort.gradeLevel,
        joinCode: cohort.joinCode,
        status: cohort.status,
        currentPhase: cohort.currentPhase,
        studentCount: cohort.studentCount,
        createdAt: cohort.createdAt.toISOString(),
        startDate: cohort.startDate?.toISOString(),
        endDate: cohort.endDate?.toISOString(),
      },
      students,
    });
  } catch (error) {
    console.error('Get cohort error:', error);
    return NextResponse.json(
      { error: 'Failed to get cohort' },
      { status: 500 }
    );
  }
}

// PUT /api/cohorts/[cohortId] - Update cohort
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ cohortId: string }> }
) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isTeacher(authUser)) {
      return NextResponse.json(
        { error: 'Only teachers can update cohorts' },
        { status: 403 }
      );
    }

    const { cohortId } = await params;
    const cohort = await getCohortById(cohortId);

    if (!cohort) {
      return NextResponse.json({ error: 'Cohort not found' }, { status: 404 });
    }

    if (cohort.teacherId !== authUser.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body: UpdateCohortRequest = await request.json();

    await updateCohort(cohortId, {
      name: body.name,
      status: body.status,
    });

    const updatedCohort = await getCohortById(cohortId);

    return NextResponse.json({
      cohort: {
        id: updatedCohort!.id,
        name: updatedCohort!.name,
        gradeLevel: updatedCohort!.gradeLevel,
        joinCode: updatedCohort!.joinCode,
        status: updatedCohort!.status,
        currentPhase: updatedCohort!.currentPhase,
        studentCount: updatedCohort!.studentCount,
        createdAt: updatedCohort!.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Update cohort error:', error);
    return NextResponse.json(
      { error: 'Failed to update cohort' },
      { status: 500 }
    );
  }
}

// POST /api/cohorts/[cohortId] - Advance cohort phase
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ cohortId: string }> }
) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isTeacher(authUser)) {
      return NextResponse.json(
        { error: 'Only teachers can advance cohort phase' },
        { status: 403 }
      );
    }

    const { cohortId } = await params;
    const cohort = await getCohortById(cohortId);

    if (!cohort) {
      return NextResponse.json({ error: 'Cohort not found' }, { status: 404 });
    }

    if (cohort.teacherId !== authUser.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const newPhase = await advancePhase(cohortId);

    return NextResponse.json({
      currentPhase: newPhase,
    });
  } catch (error) {
    console.error('Advance phase error:', error);
    return NextResponse.json(
      { error: 'Failed to advance phase' },
      { status: 500 }
    );
  }
}
