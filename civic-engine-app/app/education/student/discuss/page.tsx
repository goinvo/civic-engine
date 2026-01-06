'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, MessageCircle, Send } from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { demoDiscussions, DiscussionPost } from '@/lib/demo-data';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { StudentProgressHeader } from '@/components/education/student';

export default function StudentDiscussPage() {
  const router = useRouter();
  const { isAuthenticated, userType, user, loginAsStudent } = useDemoAuth();
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<DiscussionPost[]>(demoDiscussions);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Auto-login as student when visiting this page
  useEffect(() => {
    if (!isAuthenticated || userType !== 'student') {
      loginAsStudent(0);
    }
  }, [isAuthenticated, userType, loginAsStudent]);

  if (!isAuthenticated || userType !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading...</div>
      </div>
    );
  }

  // Get top-level posts (not replies)
  const topLevelPosts = posts.filter(d => !d.parentId);

  const handleSubmitPost = () => {
    if (!newPost.trim() || !user) return;

    const newDiscussion: DiscussionPost = {
      id: `disc-user-${Date.now()}`,
      cohortId: 'cohort-demo-001',
      policyId: 'medicare-drug-negotiation',
      authorId: user.id,
      authorName: user.displayName,
      authorStance: 'neutral',
      content: newPost.trim(),
      createdAt: new Date(),
      isFlagged: false,
      replyCount: 0,
    };

    setPosts([newDiscussion, ...posts]);
    setNewPost('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyText.trim() || !user) return;

    const newReply: DiscussionPost = {
      id: `disc-reply-${Date.now()}`,
      cohortId: 'cohort-demo-001',
      policyId: 'medicare-drug-negotiation',
      authorId: user.id,
      authorName: user.displayName,
      parentId,
      content: replyText.trim(),
      createdAt: new Date(),
      isFlagged: false,
      replyCount: 0,
    };

    setPosts([...posts, newReply]);
    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header with progress */}
      <StudentProgressHeader currentStep={3} />

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
          Class Discussion
        </h1>
        <p className="text-center text-neutral dark:text-gray-400 mb-6">
          Share perspectives and learn from your classmates.
        </p>

        {/* New Post Input */}
        <Card variant="default" padding="md" className="mb-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-[#2F3BBD] border-2 border-black flex items-center justify-center font-bold text-white shrink-0">
              {user?.displayName?.charAt(0) || 'Y'}
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts on the policies..."
                className="w-full p-3 border-2 border-black bg-white dark:bg-gray-800 text-neutral-dark dark:text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#2F3BBD]"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim()}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4 mb-8">
          {topLevelPosts.map((post) => {
            const replies = posts.filter(d => d.parentId === post.id);
            return (
              <Card key={post.id} variant="default" padding="md">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#E8EEFF] border-2 border-black flex items-center justify-center font-bold text-[#2F3BBD] shrink-0">
                    {post.authorName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-neutral-dark dark:text-white">
                        {post.authorName}
                      </span>
                      {post.authorStance && (
                        <Badge variant="primary" size="sm">
                          {post.authorStance.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-neutral dark:text-gray-300 text-sm mb-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-neutral dark:text-gray-500">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>{replies.length} replies</span>
                      <button
                        onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                        className="flex items-center gap-1 text-[#2F3BBD] hover:underline font-medium"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Reply
                      </button>
                    </div>

                    {/* Replies */}
                    {replies.map((reply) => (
                      <div key={reply.id} className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-neutral-dark dark:text-white">
                            {reply.authorName}
                          </span>
                        </div>
                        <p className="text-neutral dark:text-gray-300 text-sm">
                          {reply.content}
                        </p>
                      </div>
                    ))}

                    {/* Reply Input */}
                    {replyingTo === post.id && (
                      <div className="mt-3 pl-4 border-l-2 border-[#2F3BBD]">
                        <div className="flex gap-2">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 p-2 text-sm border-2 border-black bg-white dark:bg-gray-800 text-neutral-dark dark:text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#2F3BBD]"
                            rows={2}
                            autoFocus
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText('');
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleSubmitReply(post.id)}
                            disabled={!replyText.trim()}
                            rightIcon={<Send className="w-3 h-3" />}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Continue to reflection */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push('/education/student/reflect')}
          rightIcon={<ChevronRight className="w-5 h-5" />}
          className="w-full"
        >
          Continue to Reflection
        </Button>
      </div>
    </div>
  );
}
