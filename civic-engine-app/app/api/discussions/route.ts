import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, isTeacher } from '@/lib/auth/verify-token';
import {
  createDiscussionPost,
  getDiscussionsByPolicy,
  getTopLevelPosts,
  getReplies,
  updateDiscussionPost,
  flagPost,
  deleteDiscussionPost,
  getStudentProfile,
  getCohortById,
  getUserById,
  getPositionByStudentAndPolicy,
} from '@/lib/db/repositories';
import type { Stance } from '@/types/education';

interface CreateDiscussionRequest {
  cohortId: string;
  policyId: string;
  content: string;
  parentId?: string;
}

// GET /api/discussions - Get discussions for a policy in a cohort
export async function GET(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const cohortId = searchParams.get('cohortId');
    const policyId = searchParams.get('policyId');

    if (!cohortId || !policyId) {
      return NextResponse.json(
        { error: 'cohortId and policyId are required' },
        { status: 400 }
      );
    }

    // Verify access to cohort
    const cohort = await getCohortById(cohortId);
    if (!cohort) {
      return NextResponse.json({ error: 'Cohort not found' }, { status: 404 });
    }

    if (isTeacher(authUser)) {
      if (cohort.teacherId !== authUser.userId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } else {
      const studentProfile = await getStudentProfile(authUser.userId, cohortId);
      if (!studentProfile) {
        return NextResponse.json(
          { error: 'You are not in this cohort' },
          { status: 403 }
        );
      }
    }

    // Get top-level posts
    const topLevelPosts = await getTopLevelPosts(cohortId, policyId);

    // Build threads with replies
    const threads = await Promise.all(
      topLevelPosts.map(async (post) => {
        const replies = await getReplies(cohortId, post.id);
        return {
          post: {
            id: post.id,
            authorName: post.authorName,
            authorStance: post.authorStance,
            content: post.content,
            createdAt: post.createdAt.toISOString(),
            editedAt: post.editedAt?.toISOString(),
            isFlagged: post.isFlagged,
            replyCount: post.replyCount,
            isOwner: post.authorId === authUser.userId,
          },
          replies: replies.map((reply) => ({
            id: reply.id,
            authorName: reply.authorName,
            authorStance: reply.authorStance,
            content: reply.content,
            createdAt: reply.createdAt.toISOString(),
            editedAt: reply.editedAt?.toISOString(),
            isFlagged: reply.isFlagged,
            isOwner: reply.authorId === authUser.userId,
          })),
        };
      })
    );

    return NextResponse.json({ threads });
  } catch (error) {
    console.error('Get discussions error:', error);
    return NextResponse.json(
      { error: 'Failed to get discussions' },
      { status: 500 }
    );
  }
}

// POST /api/discussions - Create a new discussion post
export async function POST(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateDiscussionRequest = await request.json();

    if (!body.cohortId || !body.policyId || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (body.content.trim().length < 10) {
      return NextResponse.json(
        { error: 'Post must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Verify access to cohort
    const cohort = await getCohortById(body.cohortId);
    if (!cohort) {
      return NextResponse.json({ error: 'Cohort not found' }, { status: 404 });
    }

    // Check if cohort is in discussion phase
    const allowedPhases = ['discussion', 'revision'];
    if (!allowedPhases.includes(cohort.currentPhase)) {
      return NextResponse.json(
        { error: 'Discussion is not open for this cohort' },
        { status: 400 }
      );
    }

    // Get user info
    const user = await getUserById(authUser.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's stance for this policy (if they have one)
    let authorStance: Stance | undefined;
    if (!isTeacher(authUser)) {
      const position = await getPositionByStudentAndPolicy(
        authUser.userId,
        body.cohortId,
        body.policyId
      );
      authorStance = position?.stance;
    }

    // Verify student is in cohort
    if (!isTeacher(authUser)) {
      const studentProfile = await getStudentProfile(authUser.userId, body.cohortId);
      if (!studentProfile) {
        return NextResponse.json(
          { error: 'You are not in this cohort' },
          { status: 403 }
        );
      }
    } else if (cohort.teacherId !== authUser.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const post = await createDiscussionPost({
      cohortId: body.cohortId,
      policyId: body.policyId,
      authorId: authUser.userId,
      authorName: user.displayName,
      authorStance,
      parentId: body.parentId,
      content: body.content,
    });

    return NextResponse.json({
      post: {
        id: post.id,
        authorName: post.authorName,
        authorStance: post.authorStance,
        content: post.content,
        createdAt: post.createdAt.toISOString(),
        replyCount: 0,
        isOwner: true,
      },
    });
  } catch (error) {
    console.error('Create discussion error:', error);
    return NextResponse.json(
      { error: 'Failed to create discussion post' },
      { status: 500 }
    );
  }
}

// PUT /api/discussions - Update a discussion post
export async function PUT(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const cohortId = searchParams.get('cohortId');
    const postId = searchParams.get('postId');
    const action = searchParams.get('action'); // 'edit' or 'flag'

    if (!cohortId || !postId) {
      return NextResponse.json(
        { error: 'cohortId and postId are required' },
        { status: 400 }
      );
    }

    if (action === 'flag') {
      // Only teachers can flag posts
      if (!isTeacher(authUser)) {
        return NextResponse.json(
          { error: 'Only teachers can flag posts' },
          { status: 403 }
        );
      }

      await flagPost(cohortId, postId, true);
      return NextResponse.json({ message: 'Post flagged' });
    }

    // Edit post
    const body = await request.json();
    if (!body.content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    await updateDiscussionPost(cohortId, postId, body.content);
    return NextResponse.json({ message: 'Post updated' });
  } catch (error) {
    console.error('Update discussion error:', error);
    return NextResponse.json(
      { error: 'Failed to update discussion post' },
      { status: 500 }
    );
  }
}

// DELETE /api/discussions - Delete a discussion post
export async function DELETE(request: NextRequest) {
  try {
    const authUser = await authenticateRequest(request);

    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const cohortId = searchParams.get('cohortId');
    const postId = searchParams.get('postId');

    if (!cohortId || !postId) {
      return NextResponse.json(
        { error: 'cohortId and postId are required' },
        { status: 400 }
      );
    }

    // Only teachers can delete posts
    if (!isTeacher(authUser)) {
      return NextResponse.json(
        { error: 'Only teachers can delete posts' },
        { status: 403 }
      );
    }

    await deleteDiscussionPost(cohortId, postId);
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Delete discussion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete discussion post' },
      { status: 500 }
    );
  }
}
