'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Info,
  Lightbulb,
  BookOpen,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DefinitionTooltip } from '../ui/Tooltip';
import { cn } from '@/lib/utils';

// Types for policy content
interface PolicyTerm {
  term: string;
  definition: string;
}

interface PolicyContent {
  id: string;
  title: string;
  summary: {
    simplified: string;
    standard: string;
    advanced: string;
  };
  supporters: string[];
  opponents: string[];
  tradeoffs: {
    benefits: string[];
    concerns: string[];
  };
  discussionPrompts: string[];
  digDeeper: Array<{
    title: string;
    content: string;
  }>;
  terms: PolicyTerm[];
}

interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

type ReadingLevel = 'simplified' | 'standard' | 'advanced';

interface PolicyExplorerProps {
  policy: PolicyContent;
  questions: ComprehensionQuestion[];
  onComplete: (score: number) => void;
  onBack: () => void;
  className?: string;
}

export function PolicyExplorer({
  policy,
  questions,
  onComplete,
  onBack,
  className,
}: PolicyExplorerProps) {
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('standard');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (!quizSubmitted) {
      setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    }
  };

  const handleQuizSubmit = () => {
    const score = questions.reduce((acc, q) => {
      return acc + (quizAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleRetry = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const handleContinue = () => {
    onComplete(quizScore);
  };

  const allQuestionsAnswered = questions.every(q => quizAnswers[q.id] !== undefined);
  const passedQuiz = quizScore >= Math.ceil(questions.length * 0.67); // 2/3 correct

  // Render text with inline tooltips for terms
  const renderTextWithTooltips = useCallback((text: string) => {
    let result = text;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    // Find terms in the text and wrap with tooltips
    policy.terms.forEach(({ term, definition }) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          elements.push(text.slice(lastIndex, match.index));
        }
        elements.push(
          <DefinitionTooltip key={`${term}-${match.index}`} term={term} definition={definition}>
            {match[0]}
          </DefinitionTooltip>
        );
        lastIndex = match.index + match[0].length;
      }
    });

    if (elements.length === 0) {
      return text;
    }

    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }

    return <>{elements}</>;
  }, [policy.terms]);

  const summaryText = policy.summary[readingLevel];

  return (
    <div className={cn('w-full max-w-3xl mx-auto', className)}>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral dark:text-gray-400 hover:text-neutral-dark dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Policies
        </button>

        <h1 className="font-display text-3xl font-black text-neutral-dark dark:text-white mb-4">
          {policy.title}
        </h1>

        {/* Tip banner */}
        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            <strong>Tip:</strong> See an underlined word? Tap or hover for a definition.
          </p>
        </div>

        {/* Reading level selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-neutral dark:text-gray-400">
            Reading Level:
          </span>
          <div className="flex gap-1 p-1 bg-neutral-light dark:bg-gray-800">
            {(['simplified', 'standard', 'advanced'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setReadingLevel(level)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium transition-colors',
                  readingLevel === level
                    ? 'bg-white dark:bg-gray-700 text-neutral-dark dark:text-white shadow-sm'
                    : 'text-neutral dark:text-gray-400 hover:text-neutral-dark'
                )}
              >
                {level === 'simplified' && 'Simpler'}
                {level === 'standard' && 'Standard'}
                {level === 'advanced' && 'Advanced'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="space-y-6">
        {/* What is this policy? */}
        <Card variant="outlined" padding="lg">
          <SectionHeader icon={<BookOpen className="w-5 h-5" />} title="What is this policy?" />
          <p className="text-neutral-dark dark:text-gray-300 leading-relaxed mb-4">
            {renderTextWithTooltips(summaryText)}
          </p>

          {/* Dig deeper sections */}
          {policy.digDeeper.map((section, index) => (
            <ExpandableSection
              key={index}
              title={section.title}
              isExpanded={expandedSections.has(`dig-${index}`)}
              onToggle={() => toggleSection(`dig-${index}`)}
            >
              <p className="text-neutral dark:text-gray-400 text-sm">
                {section.content}
              </p>
            </ExpandableSection>
          ))}
        </Card>

        {/* Who supports/opposes? */}
        <Card variant="outlined" padding="lg">
          <SectionHeader icon={<HelpCircle className="w-5 h-5" />} title="Who supports this? Who opposes?" />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-bold text-green-700 dark:text-green-400 mb-2">Support:</p>
              <ul className="space-y-1">
                {policy.supporters.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral dark:text-gray-400">
                    <span className="text-green-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">Opposition:</p>
              <ul className="space-y-1">
                {policy.opponents.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral dark:text-gray-400">
                    <span className="text-red-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Tradeoffs */}
        <Card variant="outlined" padding="lg">
          <SectionHeader icon={<Info className="w-5 h-5" />} title="What are the trade-offs?" />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20">
              <p className="font-bold text-green-700 dark:text-green-400 mb-2">Potential benefits:</p>
              <ul className="space-y-1">
                {policy.tradeoffs.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20">
              <p className="font-bold text-red-700 dark:text-red-400 mb-2">Potential concerns:</p>
              <ul className="space-y-1">
                {policy.tradeoffs.concerns.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                    <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Discussion prompts */}
        <Card variant="outlined" padding="lg">
          <SectionHeader icon={<Lightbulb className="w-5 h-5" />} title="Questions to think about" />
          <ul className="space-y-3">
            {policy.discussionPrompts.map((prompt, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-dark dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2F3BBD]/10 flex items-center justify-center text-[#2F3BBD] font-bold text-sm">
                  {i + 1}
                </span>
                {prompt}
              </li>
            ))}
          </ul>
        </Card>

        {/* Quick Check */}
        <Card variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <SectionHeader icon={<Check className="w-5 h-5" />} title="Quick Check" />
            <Badge variant={quizSubmitted ? (passedQuiz ? 'success' : 'danger') : 'primary'}>
              {quizSubmitted ? `${quizScore}/${questions.length}` : 'Not graded'}
            </Badge>
          </div>

          <p className="text-neutral dark:text-gray-400 mb-6">
            Before you move on, answer a few questions to make sure you understood the key points.
            {!quizSubmitted && <span className="font-medium"> (Not graded — just helps you learn!)</span>}
          </p>

          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const selectedAnswer = quizAnswers[q.id];
              const isCorrect = quizSubmitted && selectedAnswer === q.correctIndex;
              const isWrong = quizSubmitted && selectedAnswer !== undefined && selectedAnswer !== q.correctIndex;

              return (
                <div key={q.id} className="space-y-3">
                  <p className="font-medium text-neutral-dark dark:text-white">
                    {qIndex + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => {
                      const isSelected = selectedAnswer === oIndex;
                      const isCorrectAnswer = oIndex === q.correctIndex;
                      const showAsCorrect = quizSubmitted && isCorrectAnswer;
                      const showAsWrong = quizSubmitted && isSelected && !isCorrectAnswer;

                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleAnswerSelect(q.id, oIndex)}
                          disabled={quizSubmitted}
                          className={cn(
                            'w-full text-left p-3 border-2 transition-all flex items-center gap-3',
                            !quizSubmitted && isSelected
                              ? 'border-[#2F3BBD] bg-[#AFC5F5]/30'
                              : !quizSubmitted
                              ? 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                              : showAsCorrect
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : showAsWrong
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-600 opacity-60'
                          )}
                        >
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center',
                              isSelected && !quizSubmitted
                                ? 'border-[#2F3BBD] bg-[#2F3BBD]'
                                : showAsCorrect
                                ? 'border-green-500 bg-green-500'
                                : showAsWrong
                                ? 'border-red-500 bg-red-500'
                                : 'border-gray-300'
                            )}
                          >
                            {((isSelected && !quizSubmitted) || showAsCorrect) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                            {showAsWrong && <X className="w-3 h-3 text-white" />}
                          </div>
                          <span className={cn(
                            showAsCorrect ? 'text-green-700 dark:text-green-300' :
                            showAsWrong ? 'text-red-700 dark:text-red-300' :
                            'text-neutral-dark dark:text-gray-300'
                          )}>
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && isWrong && (
                    <p className="text-sm text-neutral dark:text-gray-400 ml-8">
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz actions */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            {!quizSubmitted ? (
              <Button
                variant="primary"
                onClick={handleQuizSubmit}
                disabled={!allQuestionsAnswered}
                className="w-full"
              >
                Check Answers
              </Button>
            ) : passedQuiz ? (
              <div className="text-center">
                <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20">
                  <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="font-bold text-green-700 dark:text-green-300">
                    Nice! You got {quizScore}/{questions.length}.
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={handleContinue}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full"
                >
                  Continue to Next Policy
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                    You got {quizScore}/{questions.length}. Review the highlighted sections and try again?
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-1">
                    Review Policy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleRetry}
                    leftIcon={<RefreshCw className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Helper components
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 bg-[#2F3BBD]/10 flex items-center justify-center text-[#2F3BBD]">
        {icon}
      </div>
      <h2 className="font-display text-lg font-black text-neutral-dark dark:text-white">
        {title}
      </h2>
    </div>
  );
}

function ExpandableSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-[#2F3BBD] hover:opacity-80 transition-opacity"
      >
        <BookOpen className="w-4 h-4" />
        <span className="text-sm font-medium">{title}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
