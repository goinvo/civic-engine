'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Hand,
  ClipboardList,
  ScrollText,
  Vote,
  Star,
  Sparkles,
  MessageCircle,
  Users,
  Heart,
  Lightbulb,
  Scale,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Pencil,
  type LucideIcon,
} from 'lucide-react';

// Icon mapping for consistent usage
export const showcaseIcons = {
  // Intro/Welcome icons
  welcome: Hand,
  rules: ClipboardList,
  laws: ScrollText,
  voting: Vote,
  star: Star,
  sparkles: Sparkles,

  // Discussion icons
  message: MessageCircle,
  users: Users,
  heart: Heart,
  idea: Lightbulb,

  // Opinion icons
  opinion: MessageCircle,
  otherSide: Users,
  kindness: Heart,
  fairness: Scale,

  // Response icons
  like: ThumbsUp,
  dislike: ThumbsDown,
  question: HelpCircle,

  // Feedback icons
  success: CheckCircle,
  warning: AlertCircle,

  // Learning icons
  learn: BookOpen,
  write: Pencil,
} as const;

export type ShowcaseIconName = keyof typeof showcaseIcons;

// Color themes for cards
export const cardThemes = {
  blue: {
    gradient: 'from-blue-100 to-indigo-100',
    iconBg: 'bg-blue-500',
    iconColor: 'text-white',
    accent: 'text-blue-600',
  },
  green: {
    gradient: 'from-green-100 to-emerald-100',
    iconBg: 'bg-green-500',
    iconColor: 'text-white',
    accent: 'text-green-600',
  },
  amber: {
    gradient: 'from-amber-100 to-yellow-100',
    iconBg: 'bg-amber-500',
    iconColor: 'text-white',
    accent: 'text-amber-600',
  },
  purple: {
    gradient: 'from-purple-100 to-pink-100',
    iconBg: 'bg-purple-500',
    iconColor: 'text-white',
    accent: 'text-purple-600',
  },
  rose: {
    gradient: 'from-rose-100 to-orange-100',
    iconBg: 'bg-rose-500',
    iconColor: 'text-white',
    accent: 'text-rose-600',
  },
  teal: {
    gradient: 'from-teal-100 to-cyan-100',
    iconBg: 'bg-teal-500',
    iconColor: 'text-white',
    accent: 'text-teal-600',
  },
  neutral: {
    gradient: 'from-gray-50 to-slate-100',
    iconBg: 'bg-gray-600',
    iconColor: 'text-white',
    accent: 'text-gray-600',
  },
} as const;

export type CardTheme = keyof typeof cardThemes;

// Animation variants with spring physics
const cardVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 15 : -15,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  }),
};

// Icon animation with bounce
const iconVariants: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 15,
      delay: 0.1,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      rotate: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Content fade in with stagger
const contentVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

// Progress dot animation
const dotVariants: Variants = {
  inactive: { scale: 1, backgroundColor: '#e5e7eb' },
  active: {
    scale: [1, 1.3, 1],
    backgroundColor: '#2F3BBD',
    transition: {
      scale: {
        duration: 0.3,
        times: [0, 0.5, 1],
      },
    },
  },
  completed: {
    scale: 1,
    backgroundColor: '#22c55e',
  },
};

export interface ElementaryShowcaseCardProps {
  // Content
  icon?: ShowcaseIconName | LucideIcon;
  title: string;
  subtitle?: string;
  children?: ReactNode;

  // Styling
  theme?: CardTheme;

  // Animation
  direction?: number;
  cardKey: string;

  // Card stack effect
  showStack?: boolean;
}

export function ElementaryShowcaseCard({
  icon,
  title,
  subtitle,
  children,
  theme = 'blue',
  direction = 1,
  cardKey,
  showStack = true,
}: ElementaryShowcaseCardProps) {
  const themeConfig = cardThemes[theme];

  // Resolve icon - either by name or direct component
  const IconComponent = typeof icon === 'string'
    ? showcaseIcons[icon as ShowcaseIconName]
    : icon;

  return (
    <div className="relative">
      {/* Card stack visual (decorative cards behind) */}
      {showStack && (
        <>
          <motion.div
            className="absolute inset-0 bg-gray-200 border-4 border-black rounded-2xl"
            initial={{ x: 8, y: 8, opacity: 0 }}
            animate={{ x: 8, y: 8, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ zIndex: -1 }}
          />
          <motion.div
            className="absolute inset-0 bg-gray-300 border-4 border-black rounded-2xl"
            initial={{ x: 16, y: 16, opacity: 0 }}
            animate={{ x: 16, y: 16, opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={{ zIndex: -2 }}
          />
        </>
      )}

      {/* Main card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={cardKey}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`bg-gradient-to-br ${themeConfig.gradient} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 relative overflow-hidden`}
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
            <div className={`absolute top-0 right-0 w-full h-full ${themeConfig.iconBg} rounded-bl-full`} />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            {IconComponent && (
              <motion.div
                className="flex justify-center mb-4"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <div className={`w-20 h-20 ${themeConfig.iconBg} border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
                  <IconComponent className={`w-10 h-10 ${themeConfig.iconColor}`} strokeWidth={2.5} />
                </div>
              </motion.div>
            )}

            {/* Title */}
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
              className="text-center"
            >
              {subtitle && (
                <p className={`text-sm font-bold ${themeConfig.accent} uppercase tracking-wide mb-1`}>
                  {subtitle}
                </p>
              )}
              <h2 className="font-display text-2xl font-black text-neutral-dark mb-4">
                {title}
              </h2>
            </motion.div>

            {/* Content */}
            {children && (
              <motion.div
                variants={contentVariants}
                initial="initial"
                animate="animate"
                className="mt-4"
              >
                {children}
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Progress dots component
export interface ShowcaseProgressDotsProps {
  total: number;
  current: number;
  completed?: number;
}

export function ShowcaseProgressDots({ total, current, completed = current }: ShowcaseProgressDotsProps) {
  return (
    <div className="flex justify-center gap-2 flex-wrap max-w-xs mx-auto">
      {Array.from({ length: total }).map((_, index) => (
        <motion.div
          key={index}
          className="w-3 h-3 rounded-full border-2 border-black"
          variants={dotVariants}
          initial="inactive"
          animate={
            index < completed
              ? 'completed'
              : index === current
              ? 'active'
              : 'inactive'
          }
        />
      ))}
    </div>
  );
}

// Celebration confetti effect
export function ShowcaseCelebration() {
  const confettiColors = ['#2F3BBD', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 100}%`,
          }}
          initial={{
            y: -20,
            x: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: 400,
            x: (Math.random() - 0.5) * 200,
            rotate: Math.random() * 720 - 360,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// Complete/Success card variant
export interface ShowcaseCompleteCardProps {
  title: string;
  message: string;
  bulletPoints?: { icon: ShowcaseIconName | LucideIcon; text: string }[];
  actionLabel: string;
  onAction: () => void;
  showCelebration?: boolean;
}

export function ShowcaseCompleteCard({
  title,
  message,
  bulletPoints,
  actionLabel,
  onAction,
  showCelebration = true,
}: ShowcaseCompleteCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 relative overflow-hidden"
    >
      {showCelebration && <ShowcaseCelebration />}

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 10,
            delay: 0.2,
          }}
          className="w-24 h-24 mx-auto mb-4 bg-[#2F3BBD] border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-2xl font-black text-neutral-dark mb-2"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-neutral mb-4"
        >
          {message}
        </motion.p>

        {bulletPoints && bulletPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2 text-left bg-white border-2 border-black p-4 rounded-xl mb-6"
          >
            {bulletPoints.map((point, index) => {
              const PointIcon = typeof point.icon === 'string'
                ? showcaseIcons[point.icon as ShowcaseIconName]
                : point.icon;
              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  {PointIcon && <PointIcon className="w-5 h-5 text-[#2F3BBD]" />}
                  <span>{point.text}</span>
                </motion.p>
              );
            })}
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="w-full bg-[#2F3BBD] text-white font-bold py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-xl"
        >
          {actionLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}
