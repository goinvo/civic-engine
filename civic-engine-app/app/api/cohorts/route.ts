import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, isTeacher } from '@/lib/auth/verify-token';
import {
  createCohort,
  getCohortsByTeacher,
  type CreateCohortInput,
} from '@/lib/db/repositories';
import type { GradeLevel } from '@/types/education';

interface CreateCohortRequest {
  name: string;
  gradeLevel: GradeLevel;
  policySetId?: string;
}

// GET /api/cohorts - Get all cohorts for the authenticated teacher
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isTeacher(authUser)) {
      return NextResponse.json(
        { error: 'Only teachers can view cohorts' },
        { status: 403 }
      );
    }

    const cohorts = await getCohortsByTeacher(authUser.userId);

    return NextResponse.json({
      cohorts: cohorts.map((cohort) => ({
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
      })),
    });
  } catch (error) {
    console.error('Get cohorts error:', error);
    return NextResponse.json(
      { error: 'Failed to get cohorts' },
      { status: 500 }
    );
  }
}

// POST /api/cohorts - Create a new cohort
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isTeacher(authUser)) {
      return NextResponse.json(
        { error: 'Only teachers can create cohorts' },
        { status: 403 }
      );
    }

    const body: CreateCohortRequest = await request.json();

    if (!body.name || !body.gradeLevel) {
      return NextResponse.json(
        { error: 'Name and grade level are required' },
        { status: 400 }
      );
    }

    const validGradeLevels: GradeLevel[] = ['6-8', '9-10', '11-12', 'college'];
    if (!validGradeLevels.includes(body.gradeLevel)) {
      return NextResponse.json(
        { error: 'Invalid grade level' },
        { status: 400 }
      );
    }

    const input: CreateCohortInput = {
      teacherId: authUser.userId,
      name: body.name,
      gradeLevel: body.gradeLevel,
      policySetId: body.policySetId,
    };

    const cohort = await createCohort(input);

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
      },
    });
  } catch (error) {
    console.error('Create cohort error:', error);
    return NextResponse.json(
      { error: 'Failed to create cohort' },
      { status: 500 }
    );
  }
}
