'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  ChevronDown,
  Send,
  Flag,
  CornerDownRight,
  Users
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { DiscussionPost, DiscussionThread, Stance } from '@/types/education';
import { cn } from '@/lib/utils';

interface DiscussionViewProps {
  policyId: string;
  policyTitle: string;
  posts: DiscussionThread[];
  stanceDistribution: {
    support: number;
    neutral: number;
    oppose: number;
  };
  totalParticipants: number;
  currentUserId: string;
  onPostComment: (content: string, parentId?: string) => Promise<void>;
  onFlagPost: (postId: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

const STANCE_LABELS: Record<Stance, string> = {
  strongly_support: 'Strongly support',
  somewhat_support: 'Somewhat support',
  neutral: 'Neutral',
  somewhat_oppose: 'Somewhat oppose',
  strongly_oppose: 'Strongly oppose',
};

const STANCE_COLORS: Record<Stance, string> = {
  strongly_support: 'bg-green-100 text-green-700 border-green-300',
  somewhat_support: 'bg-green-50 text-green-600 border-green-200',
  neutral: 'bg-gray-100 text-gray-600 border-gray-300',
  somewhat_oppose: 'bg-red-50 text-red-600 border-red-200',
  strongly_oppose: 'bg-red-100 text-red-700 border-red-300',
};

export function DiscussionView({
  policyId,
  policyTitle,
  posts,
  stanceDistribution,
  totalParticipants,
  currentUserId,
  onPostComment,
  onFlagPost,
  onLoadMore,
  hasMore,
  className,
}: DiscussionViewProps) {
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setIsPosting(true);
    try {
      await onPostComment(newComment);
      setNewComment('');
    } finally {
      setIsPosting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;
    setIsPosting(true);
    try {
      await onPostComment(replyContent, parentId);
      setReplyContent('');
      setReplyingTo(null);
    } finally {
      setIsPosting(false);
    }
  };

  const totalComments = posts.reduce((acc, thread) => acc + 1 + thread.replies.length, 0);

  return (
    <div className={cn('w-full max-w-3xl mx-auto', className)}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
          Class Discussion
        </h1>

        {/* Policy selector could go here */}
        <Card variant="outlined" padding="md" className="mb-4">
          <h2 className="font-bold text-lg text-neutral-dark dark:text-white mb-2">
            {policyTitle}
          </h2>
          <div className="flex items-center gap-4 text-sm text-neutral dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {totalParticipants} classmates have shared positions
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {totalComments} comments
            </span>
          </div>
        </Card>

        {/* Class sentiment */}
        <div className="mb-6">
          <p className="text-sm font-medium text-neutral dark:text-gray-400 mb-2">
            Class sentiment (anonymous aggregate):
          </p>
          <StanceBar distribution={stanceDistribution} />
        </div>
      </div>

      {/* Discussion threads */}
      <div className="space-y-4 mb-6">
        {posts.map((thread) => (
          <DiscussionThreadView
            key={thread.post.id}
            thread={thread}
            currentUserId={currentUserId}
            replyingTo={replyingTo}
            replyContent={replyContent}
            onReplyClick={(postId) => {
              setReplyingTo(replyingTo === postId ? null : postId);
              setReplyContent('');
            }}
            onReplyChange={setReplyContent}
            onReplySubmit={handleSubmitReply}
            onFlag={onFlagPost}
            isPosting={isPosting}
          />
        ))}

        {hasMore && (
          <Button variant="ghost" className="w-full" onClick={onLoadMore}>
            Load more comments...
          </Button>
        )}
      </div>

      {/* New comment form */}
      <Card variant="default" padding="md">
        <p className="font-medium text-neutral-dark dark:text-white mb-3">
          Add to the discussion:
        </p>
        <Textarea
          placeholder="Share your thoughts on this policy..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <Button
            variant="primary"
            onClick={handleSubmitComment}
            isLoading={isPosting}
            disabled={!newComment.trim()}
            rightIcon={<Send className="w-4 h-4" />}
          >
            Post Comment
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Stance distribution bar
interface StanceBarProps {
  distribution: {
    support: number;
    neutral: number;
    oppose: number;
  };
}

function StanceBar({ distribution }: StanceBarProps) {
  const total = distribution.support + distribution.neutral + distribution.oppose;
  if (total === 0) return null;

  const supportPct = Math.round((distribution.support / total) * 100);
  const neutralPct = Math.round((distribution.neutral / total) * 100);
  const opposePct = Math.round((distribution.oppose / total) * 100);

  return (
    <div>
      <div className="flex h-4 overflow-hidden border-2 border-black dark:border-gray-600">
        {supportPct > 0 && (
          <div
            className="bg-green-500 transition-all"
            style={{ width: `${supportPct}%` }}
          />
        )}
        {neutralPct > 0 && (
          <div
            className="bg-gray-400 transition-all"
            style={{ width: `${neutralPct}%` }}
          />
        )}
        {opposePct > 0 && (
          <div
            className="bg-red-500 transition-all"
            style={{ width: `${opposePct}%` }}
          />
        )}
      </div>
      <div className="flex justify-between mt-1 text-xs text-neutral dark:text-gray-400">
        <span>{supportPct}% support</span>
        <span>{neutralPct}% neutral</span>
        <span>{opposePct}% oppose</span>
      </div>
    </div>
  );
}

// Single thread with replies
interface DiscussionThreadViewProps {
  thread: DiscussionThread;
  currentUserId: string;
  replyingTo: string | null;
  replyContent: string;
  onReplyClick: (postId: string) => void;
  onReplyChange: (content: string) => void;
  onReplySubmit: (parentId: string) => void;
  onFlag: (postId: string) => void;
  isPosting: boolean;
}

function DiscussionThreadView({
  thread,
  currentUserId,
  replyingTo,
  replyContent,
  onReplyClick,
  onReplyChange,
  onReplySubmit,
  onFlag,
  isPosting,
}: DiscussionThreadViewProps) {
  const [showReplies, setShowReplies] = useState(true);

  return (
    <Card variant="outlined" padding="md">
      {/* Main post */}
      <PostContent
        post={thread.post}
        currentUserId={currentUserId}
        onReplyClick={() => onReplyClick(thread.post.id)}
        onFlag={() => onFlag(thread.post.id)}
      />

      {/* Reply count */}
      {thread.replies.length > 0 && (
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="flex items-center gap-1 text-sm text-[#2F3BBD] hover:opacity-80 mt-3"
        >
          <MessageSquare className="w-4 h-4" />
          {thread.replies.length} {thread.replies.length === 1 ? 'reply' : 'replies'}
          <ChevronDown className={cn('w-4 h-4 transition-transform', showReplies && 'rotate-180')} />
        </button>
      )}

      {/* Replies */}
      <AnimatePresence>
        {showReplies && thread.replies.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-3">
              {thread.replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-2">
                  <CornerDownRight className="w-4 h-4 text-neutral dark:text-gray-500 mt-1 flex-shrink-0" />
                  <PostContent
                    post={reply}
                    currentUserId={currentUserId}
                    isReply
                    onReplyClick={() => onReplyClick(thread.post.id)}
                    onFlag={() => onFlag(reply.id)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reply form */}
      <AnimatePresence>
        {replyingTo === thread.post.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Textarea
                placeholder={`Reply to ${thread.post.authorName}...`}
                value={replyContent}
                onChange={(e) => onReplyChange(e.target.value)}
                rows={2}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => onReplyClick(thread.post.id)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onReplySubmit(thread.post.id)}
                  isLoading={isPosting}
                  disabled={!replyContent.trim()}
                  rightIcon={<Send className="w-3 h-3" />}
                >
                  Reply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// Individual post content
interface PostContentProps {
  post: DiscussionPost;
  currentUserId: string;
  isReply?: boolean;
  onReplyClick: () => void;
  onFlag: () => void;
}

function PostContent({ post, currentUserId, isReply, onReplyClick, onFlag }: PostContentProps) {
  const isOwn = post.authorId === currentUserId;
  const stanceLabel = post.authorStance ? STANCE_LABELS[post.authorStance] : null;
  const stanceColor = post.authorStance ? STANCE_COLORS[post.authorStance] : '';

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-neutral-dark dark:text-white">
          {post.authorName}
          {isOwn && <span className="text-neutral dark:text-gray-400 font-normal ml-1">(you)</span>}
        </span>
        {stanceLabel && (
          <Badge size="sm" className={stanceColor}>
            {stanceLabel}
          </Badge>
        )}
      </div>

      {/* Content */}
      <p className="text-neutral-dark dark:text-gray-300 text-sm whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-2">
        <span className="text-xs text-neutral dark:text-gray-500">
          {formatTimeAgo(post.createdAt)}
        </span>
        {!isReply && (
          <button
            onClick={onReplyClick}
            className="text-xs text-[#2F3BBD] hover:opacity-80"
          >
            Reply
          </button>
        )}
        {!isOwn && (
          <button
            onClick={onFlag}
            className="text-xs text-neutral dark:text-gray-500 hover:text-red-500 flex items-center gap-1"
          >
            <Flag className="w-3 h-3" />
            Flag
          </button>
        )}
      </div>
    </div>
  );
}

// Helper function for time formatting
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(date).toLocaleDateString();
}
