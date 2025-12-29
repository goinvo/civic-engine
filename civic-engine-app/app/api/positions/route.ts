import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, isTeacher, isStudent } from '@/lib/auth/verify-token';
import {
  createPosition,
  getPositionsByStudent,
  getPositionsByPolicy,
  getPositionByStudentAndPolicy,
  createPositionRevision,
  getStudentProfile,
  getCohortById,
} from '@/lib/db/repositories';
import type { Stance } from '@/types/education';

interface CreatePositionRequest {
  cohortId: string;
  policyId: string;
  stance: Stance;
  reasoning: string;
  steelman: string;
}

interface GetPositionsQuery {
  cohortId?: string;
  policyId?: string;
}

// GET /api/positions - Get positions
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const cohortId = searchParams.get('cohortId');
    const policyId = searchParams.get('policyId');

    if (!cohortId) {
      return NextResponse.json(
        { error: 'cohortId is required' },
        { status: 400 }
      );
    }

    // Verify access to cohort
    const cohort = await getCohortById(cohortId);
    if (!cohort) {
      return NextResponse.json({ error: 'Cohort not found' }, { status: 404 });
    }

    if (isTeacher(authUser)) {
      // Teachers can view all positions in their cohorts (anonymized)
      if (cohort.teacherId !== authUser.userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      if (policyId) {
        const positions = await getPositionsByPolicy(cohortId, policyId);
        // Anonymize positions for teachers
        return NextResponse.json({
          positions: positions.map((p, index) => ({
            id: p.id,
            anonymousId: `Student ${index + 1}`,
            policyId: p.policyId,
            stance: p.stance,
            reasoning: p.reasoning,
            steelman: p.steelman,
            createdAt: p.createdAt.toISOString(),
            isRevision: p.isRevision,
          })),
        });
      }

      return NextResponse.json(
        { error: 'policyId is required for teacher view' },
        { status: 400 }
      );
    }

    // Students can only view their own positions
    const studentProfile = await getStudentProfile(authUser.userId, cohortId);
    if (!studentProfile) {
      return NextResponse.json(
        { error: 'You are not in this cohort' },
        { status: 403 }
      );
    }

    const positions = await getPositionsByStudent(authUser.userId, cohortId);

    return NextResponse.json({
      positions: positions.map((p) => ({
        id: p.id,
        policyId: p.policyId,
        stance: p.stance,
        reasoning: p.reasoning,
        steelman: p.steelman,
        createdAt: p.createdAt.toISOString(),
        isRevision: p.isRevision,
        originalPositionId: p.originalPositionId,
      })),
    });
  } catch (error) {
    console.error('Get positions error:', error);
    return NextResponse.json(
      { error: 'Failed to get positions' },
      { status: 500 }
    );
  }
}

// POST /api/positions - Create a new position
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreatePositionRequest = await request.json();

    if (!body.cohortId || !body.policyId || !body.stance || !body.reasoning || !body.steelman) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify student is in this cohort
    const studentProfile = await getStudentProfile(authUser.userId, body.cohortId);
    if (!studentProfile) {
      return NextResponse.json(
        { error: 'You are not in this cohort' },
        { status: 403 }
      );
    }

    // Check if cohort is in a phase that allows position submission
    const cohort = await getCohortById(body.cohortId);
    if (!cohort) {
      return NextResponse.json({ error: 'Cohort not found' }, { status: 404 });
    }

    const allowedPhases = ['positions', 'discussion', 'revision'];
    if (!allowedPhases.includes(cohort.currentPhase)) {
      return NextResponse.json(
        { error: 'Position submission is not open for this cohort' },
        { status: 400 }
      );
    }

    // Check if student already has a position for this policy
    const existingPosition = await getPositionByStudentAndPolicy(
      authUser.userId,
      body.cohortId,
      body.policyId
    );

    if (existingPosition) {
      // This should be a revision, not a new position
      if (cohort.currentPhase !== 'revision') {
        return NextResponse.json(
          { error: 'You have already submitted a position for this policy' },
          { status: 400 }
        );
      }

      // Create revision
      const revision = await createPositionRevision(existingPosition.id, body.cohortId, {
        studentId: authUser.userId,
        cohortId: body.cohortId,
        policyId: body.policyId,
        stance: body.stance,
        reasoning: body.reasoning,
        steelman: body.steelman,
      });

      return NextResponse.json({
        position: {
          id: revision.id,
          policyId: revision.policyId,
          stance: revision.stance,
          reasoning: revision.reasoning,
          steelman: revision.steelman,
          createdAt: revision.createdAt.toISOString(),
          isRevision: true,
          originalPositionId: existingPosition.id,
        },
      });
    }

    // Create new position
    const position = await createPosition({
      studentId: authUser.userId,
      cohortId: body.cohortId,
      policyId: body.policyId,
      stance: body.stance,
      reasoning: body.reasoning,
      steelman: body.steelman,
    });

    return NextResponse.json({
      position: {
        id: position.id,
        policyId: position.policyId,
        stance: position.stance,
        reasoning: position.reasoning,
        steelman: position.steelman,
        createdAt: position.createdAt.toISOString(),
        isRevision: false,
      },
    });
  } catch (error) {
    console.error('Create position error:', error);
    return NextResponse.json(
      { error: 'Failed to create position' },
      { status: 500 }
    );
  }
}
