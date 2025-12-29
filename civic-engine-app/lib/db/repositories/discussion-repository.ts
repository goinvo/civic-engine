import {
  putItem,
  getItem,
  queryItems,
  updateItem,
  deleteItem,
  Keys,
  EntityType,
  generateId,
} from '../dynamodb-client';
import type { DiscussionPost, Stance } from '@/types/education';

// DynamoDB item type
interface DiscussionItem {
  PK: string;
  SK: string;
  GSI2PK: string;
  GSI2SK: string;
  entityType: string;
  id: string;
  cohortId: string;
  policyId: string;
  authorId: string;
  authorName: string;
  authorStance?: Stance;
  parentId?: string;
  content: string;
  createdAt: string;
  editedAt?: string;
  isFlagged: boolean;
  replyCount: number;
}

// Convert DB item to domain model
function toDiscussionPost(item: DiscussionItem): DiscussionPost {
  return {
    id: item.id,
    cohortId: item.cohortId,
    policyId: item.policyId,
    authorId: item.authorId,
    authorName: item.authorName,
    authorStance: item.authorStance,
    parentId: item.parentId,
    content: item.content,
    createdAt: new Date(item.createdAt),
    editedAt: item.editedAt ? new Date(item.editedAt) : undefined,
    isFlagged: item.isFlagged,
    replyCount: item.replyCount,
  };
}

// Create post input
export interface CreateDiscussionPostInput {
  cohortId: string;
  policyId: string;
  authorId: string;
  authorName: string;
  authorStance?: Stance;
  parentId?: string;
  content: string;
}

// Repository functions
export async function createDiscussionPost(
  input: CreateDiscussionPostInput
): Promise<DiscussionPost> {
  const id = generateId();
  const now = new Date();
  const keys = Keys.discussion(input.cohortId, id);

  const item: DiscussionItem = {
    ...keys,
    GSI2PK: `COHORT#${input.cohortId}`,
    GSI2SK: `POLICY#${input.policyId}#DISCUSSION#${now.toISOString()}`,
    entityType: EntityType.DISCUSSION,
    id,
    cohortId: input.cohortId,
    policyId: input.policyId,
    authorId: input.authorId,
    authorName: input.authorName,
    authorStance: input.authorStance,
    parentId: input.parentId,
    content: input.content,
    createdAt: now.toISOString(),
    isFlagged: false,
    replyCount: 0,
  };

  await putItem(item);

  // If this is a reply, increment parent's reply count
  if (input.parentId) {
    await incrementReplyCount(input.cohortId, input.parentId);
  }

  return toDiscussionPost(item);
}

export async function getDiscussionPostById(
  cohortId: string,
  postId: string
): Promise<DiscussionPost | null> {
  const keys = Keys.discussion(cohortId, postId);
  const item = await getItem<DiscussionItem>(keys.PK, keys.SK);
  return item ? toDiscussionPost(item) : null;
}

export async function getDiscussionsByPolicy(
  cohortId: string,
  policyId: string
): Promise<DiscussionPost[]> {
  const items = await queryItems<DiscussionItem>({
    IndexName: 'GSI2',
    KeyConditionExpression: 'GSI2PK = :pk AND begins_with(GSI2SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `COHORT#${cohortId}`,
      ':sk': `POLICY#${policyId}#DISCUSSION`,
    },
    ScanIndexForward: true, // Oldest first for chronological order
  });

  return items.map(toDiscussionPost);
}

export async function getTopLevelPosts(
  cohortId: string,
  policyId: string
): Promise<DiscussionPost[]> {
  const allPosts = await getDiscussionsByPolicy(cohortId, policyId);
  return allPosts.filter((post) => !post.parentId);
}

export async function getReplies(
  cohortId: string,
  parentId: string
): Promise<DiscussionPost[]> {
  // Get all discussions in cohort and filter for replies to parent
  // This could be optimized with a GSI on parentId if needed
  const items = await queryItems<DiscussionItem>({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    FilterExpression: 'parentId = :parentId',
    ExpressionAttributeValues: {
      ':pk': `COHORT#${cohortId}`,
      ':sk': 'DISCUSSION#',
      ':parentId': parentId,
    },
  });

  return items.map(toDiscussionPost);
}

export async function updateDiscussionPost(
  cohortId: string,
  postId: string,
  content: string
): Promise<void> {
  const keys = Keys.discussion(cohortId, postId);
  await updateItem(
    keys.PK,
    keys.SK,
    'SET content = :content, editedAt = :editedAt',
    {
      ':content': content,
      ':editedAt': new Date().toISOString(),
    }
  );
}

export async function flagPost(
  cohortId: string,
  postId: string,
  flagged: boolean = true
): Promise<void> {
  const keys = Keys.discussion(cohortId, postId);
  await updateItem(keys.PK, keys.SK, 'SET isFlagged = :flagged', {
    ':flagged': flagged,
  });
}

export async function deleteDiscussionPost(
  cohortId: string,
  postId: string
): Promise<void> {
  const post = await getDiscussionPostById(cohortId, postId);
  if (!post) return;

  const keys = Keys.discussion(cohortId, postId);
  await deleteItem(keys.PK, keys.SK);

  // If this was a reply, decrement parent's reply count
  if (post.parentId) {
    await decrementReplyCount(cohortId, post.parentId);
  }
}

async function incrementReplyCount(
  cohortId: string,
  postId: string
): Promise<void> {
  const keys = Keys.discussion(cohortId, postId);
  await updateItem(keys.PK, keys.SK, 'SET replyCount = replyCount + :inc', {
    ':inc': 1,
  });
}

async function decrementReplyCount(
  cohortId: string,
  postId: string
): Promise<void> {
  const keys = Keys.discussion(cohortId, postId);
  await updateItem(keys.PK, keys.SK, 'SET replyCount = replyCount - :dec', {
    ':dec': 1,
  });
}

// Get discussion stats for a cohort
export async function getDiscussionStats(cohortId: string): Promise<{
  totalPosts: number;
  totalReplies: number;
  avgPostLength: number;
  flaggedCount: number;
}> {
  const items = await queryItems<DiscussionItem>({
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
      ':pk': `COHORT#${cohortId}`,
      ':sk': 'DISCUSSION#',
    },
  });

  const posts = items.filter((item) => !item.parentId);
  const replies = items.filter((item) => item.parentId);
  const totalLength = items.reduce((sum, item) => sum + item.content.length, 0);
  const flagged = items.filter((item) => item.isFlagged);

  return {
    totalPosts: posts.length,
    totalReplies: replies.length,
    avgPostLength: items.length > 0 ? Math.round(totalLength / items.length) : 0,
    flaggedCount: flagged.length,
  };
}
