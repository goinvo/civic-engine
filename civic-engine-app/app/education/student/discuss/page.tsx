'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, MessageCircle, Send, CheckCircle, Circle, ArrowLeft, Users } from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { demoDiscussions, DiscussionPost, getPolicySetByGradeLevel } from '@/lib/demo-data';
import { Card } from '@/components/education/ui/Card';
import { Button } from '@/components/education/ui/Button';
import { Badge } from '@/components/education/ui/Badge';
import { StudentProgressHeader, ElementaryCardDeck } from '@/components/education/student';
import { getPolicyById } from '@/data/policies';

export default function StudentDiscussPage() {
  const router = useRouter();
  const { isAuthenticated, userType, user, loginAsStudent, gradeLevel } = useDemoAuth();
  const [posts, setPosts] = useState<DiscussionPost[]>(demoDiscussions);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [newPost, setNewPost] = useState('');

  // Track selected policy for discussion
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

  // Get policies based on grade level for tracking progress
  const policySet = getPolicySetByGradeLevel(gradeLevel);
  // Keep both the policy set item (for display overrides) and the actual policy data
  const policiesWithOverrides = policySet.policies.map(policySetItem => ({
    policySetItem,
    policy: getPolicyById(policySetItem.policyId),
  })).filter(item => item.policy);

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

  // Track which policies user has posted about
  const userPosts = posts.filter(p => p.authorId === user?.id && !p.parentId);
  const policiesDiscussed = new Set(userPosts.map(p => p.policyId));
  const discussedCount = policiesDiscussed.size;
  const totalPolicies = policiesWithOverrides.length;

  // Check if elementary grade level
  const isElementary = gradeLevel === 'K-5';

  // Handle elementary card deck response submission
  const handleElementarySubmit = (policyId: string, content: string, promptUsed: string) => {
    if (!user) return;

    const newPost: DiscussionPost = {
      id: `disc-elem-${Date.now()}`,
      cohortId: 'cohort-demo-001',
      policyId,
      authorId: user.id,
      authorName: user.displayName,
      content,
      createdAt: new Date(),
      isFlagged: false,
      replyCount: 0,
    };

    setPosts(prev => [newPost, ...prev]);
  };

  // Handle submitting a new post for selected policy
  const handleSubmitPost = () => {
    if (!newPost.trim() || !user || !selectedPolicyId) return;

    const newDiscussion: DiscussionPost = {
      id: `disc-user-${Date.now()}`,
      cohortId: 'cohort-demo-001',
      policyId: selectedPolicyId,
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
    if (!replyText.trim() || !user || !selectedPolicyId) return;

    const newReply: DiscussionPost = {
      id: `disc-reply-${Date.now()}`,
      cohortId: 'cohort-demo-001',
      policyId: selectedPolicyId,
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

  // Elementary card deck view
  if (isElementary) {
    // Prepare policies for card deck
    const cardDeckPolicies = policiesWithOverrides.map(({ policySetItem, policy }) => ({
      id: policy?.id || '',
      title: policySetItem.displayTitle || policy?.title || '',
      description: policySetItem.displayDescription || policy?.description || '',
    }));

    // Get existing responses from other students
    const otherStudentResponses = posts
      .filter(p => !p.parentId && p.authorId !== user?.id)
      .map(p => ({
        id: p.id,
        authorName: p.authorName,
        content: p.content,
        policyId: p.policyId,
      }));

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
        {/* Header with progress */}
        <StudentProgressHeader currentStep={3} />

        {/* Content */}
        <div className="py-8">
          <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
            Share Your Ideas!
          </h1>
          <p className="text-center text-neutral dark:text-gray-400 mb-8">
            Let&apos;s think about these big ideas together
          </p>

          <ElementaryCardDeck
            policies={cardDeckPolicies}
            existingResponses={otherStudentResponses}
            userName={user?.displayName || 'Friend'}
            onSubmitResponse={handleElementarySubmit}
            onComplete={() => router.push('/education/student/reflect')}
          />
        </div>
      </div>
    );
  }

  // Get selected policy info
  const selectedPolicy = selectedPolicyId
    ? policiesWithOverrides.find(p => p.policy?.id === selectedPolicyId)
    : null;

  // POLICY SELECTION VIEW
  if (!selectedPolicyId) {
    return (
      <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
        <StudentProgressHeader currentStep={3} />

        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
            Class Discussion
          </h1>
          <p className="text-center text-neutral dark:text-gray-400 mb-2">
            Choose a policy to discuss with your classmates
          </p>
          <p className="text-center text-sm text-neutral dark:text-gray-500 mb-8">
            {discussedCount} of {totalPolicies} policies discussed
          </p>

          {/* Policy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {policiesWithOverrides.map(({ policySetItem, policy }) => {
              const hasDiscussed = policy?.id ? policiesDiscussed.has(policy.id) : false;
              const title = policySetItem.displayTitle || policy?.title || 'Unknown Policy';
              const description = policySetItem.displayDescription || policy?.description;
              const policyPosts = posts.filter(p => p.policyId === policy?.id && !p.parentId);

              return (
                <Card
                  key={policy?.id}
                  variant="default"
                  padding="md"
                  className="flex flex-col h-full cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  onClick={() => setSelectedPolicyId(policy?.id || null)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      {hasDiscussed ? (
                        <Badge variant="success" size="sm">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Discussed
                        </Badge>
                      ) : (
                        <Badge variant="default" size="sm">
                          Join Discussion
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-xs text-neutral dark:text-gray-400">
                        <MessageCircle className="w-3 h-3" />
                        {policyPosts.length}
                      </div>
                    </div>
                    <h3 className="font-bold text-neutral-dark dark:text-white mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-neutral dark:text-gray-400 mb-4 line-clamp-2">
                      {description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-xs text-neutral dark:text-gray-400">
                      <Users className="w-3 h-3" />
                      {new Set(policyPosts.map(p => p.authorId)).size} participants
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#2F3BBD]" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/education/student/reflect')}
              rightIcon={<ChevronRight className="w-5 h-5" />}
              className="w-full max-w-md"
            >
              Continue to Reflection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // DISCUSSION FORUM VIEW
  const policyTitle = selectedPolicy?.policySetItem.displayTitle || selectedPolicy?.policy?.title || 'Policy Discussion';
  const policyPosts = posts.filter(p => p.policyId === selectedPolicyId && !p.parentId);

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      <StudentProgressHeader currentStep={3} />

      {/* Back button header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <button
            onClick={() => {
              setSelectedPolicyId(null);
              setNewPost('');
              setReplyingTo(null);
              setReplyText('');
            }}
            className="inline-flex items-center gap-2 text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white transition-colors text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Policies
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Policy Header */}
        <div className="mb-6">
          <Badge variant="primary" size="sm" className="mb-2">
            Discussion
          </Badge>
          <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
            {policyTitle}
          </h1>
          <p className="text-neutral dark:text-gray-400">
            {selectedPolicy?.policySetItem.displayDescription || selectedPolicy?.policy?.description}
          </p>
        </div>

        {/* New Post Input */}
        <Card variant="default" padding="md" className="mb-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-[#2F3BBD] border-2 border-black flex items-center justify-center font-bold text-white shrink-0 rounded">
              {user?.displayName?.charAt(0) || 'Y'}
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts on this policy..."
                className="w-full p-3 border-2 border-black bg-white dark:bg-gray-800 text-neutral-dark dark:text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] rounded"
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

        {/* Discussion Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {policyPosts.length} {policyPosts.length === 1 ? 'post' : 'posts'}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {new Set(policyPosts.map(p => p.authorId)).size} participants
          </span>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {policyPosts.length === 0 ? (
            <Card variant="default" padding="lg" className="text-center">
              <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-neutral dark:text-gray-400 mb-1">No posts yet</p>
              <p className="text-sm text-neutral dark:text-gray-500">Be the first to share your thoughts!</p>
            </Card>
          ) : (
            policyPosts.map((post) => {
              const replies = posts.filter(d => d.parentId === post.id);
              return (
                <Card key={post.id} variant="default" padding="md">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#E8EEFF] border-2 border-black flex items-center justify-center font-bold text-[#2F3BBD] shrink-0 rounded">
                      {post.authorName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-neutral-dark dark:text-white">
                          {post.authorName}
                        </span>
                        {post.authorId === user?.id && (
                          <Badge variant="default" size="sm">You</Badge>
                        )}
                      </div>
                      <p className="text-neutral dark:text-gray-300 text-sm mb-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-neutral dark:text-gray-500">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>
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
                            {reply.authorId === user?.id && (
                              <Badge variant="default" size="sm">You</Badge>
                            )}
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
                              className="flex-1 p-2 text-sm border-2 border-black bg-white dark:bg-gray-800 text-neutral-dark dark:text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#2F3BBD] rounded"
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
            })
          )}
        </div>
      </div>
    </div>
  );
}
