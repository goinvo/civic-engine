'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Palette,
  Users,
  GraduationCap,
  MessageSquare,
  ClipboardCheck,
  Award,
  PieChart,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

// UI Components
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Textarea,
  Modal,
  ConfirmModal,
  Tooltip,
  DefinitionTooltip,
  Badge,
  Progress,
  StepProgress,
  AnimatedStepProgress,
  Banner,
  InlineBanner,
  Toggle,
  SegmentedControl,
} from '@/components/education/ui';
import type { Step } from '@/components/education/ui';

// Teacher Components
import {
  CohortCard,
  CohortCardCompact,
  CreateCohortModal,
  PolicySetSelector,
  ClassProfileShareCardVideo,
} from '@/components/education/teacher';

// Student Components
import {
  JoinClassForm,
  PolicyPicker,
  PolicyProgress,
  PolicyExplorer,
  PositionForm,
  PositionRevisionForm,
  DiscussionView,
  ReflectionForm,
  CivicProfile,
  CivicProfileShareCardVideo,
} from '@/components/education/student';

import { Cohort, DiscussionThread } from '@/types/education';
import { cn } from '@/lib/utils';

// Visualizations
import { ArchetypeRadarChart } from '@/components/v2/ArchetypeRadarChart';
import { V2FactorScores, V2WeightProfile } from '@/types/consensus';
import {
  MiniBarChart,
  MiniComparisonChart,
  MiniTrendChart,
  MiniDonutChart,
  MiniChart,
  type ChartData,
} from '@/components/charts';

// Problem Areas Components
import {
  RatingScale,
  RatingInput,
  RatingBadge,
  TradeoffsDisplay,
  VoicesList,
  PreferenceRadar,
} from '@/components/problem-areas';
import type { ImplementationRating, Voice, Tradeoffs } from '@/types/problem-areas';

// Section navigation
const SECTIONS = [
  { id: 'primitives', label: 'UI Primitives', icon: Palette },
  { id: 'problem-areas', label: 'Problem Areas', icon: ClipboardCheck },
  { id: 'visualizations', label: 'Visualizations', icon: PieChart },
  { id: 'teacher', label: 'Teacher Flow', icon: Users },
  { id: 'student-join', label: 'Student Join', icon: GraduationCap },
  { id: 'student-explore', label: 'Policy Exploration', icon: ClipboardCheck },
  { id: 'student-discuss', label: 'Discussion', icon: MessageSquare },
  { id: 'student-reflect', label: 'Reflection', icon: Award },
  { id: 'share-cards', label: 'Share Cards', icon: Sparkles },
];

export default function ShowcasePage() {
  const [activeSection, setActiveSection] = useState('primitives');
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  // Toggle dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b-2 border-black dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white">
                Civic Engine Education
              </h1>
              <p className="text-sm text-neutral dark:text-gray-400">
                Component Showcase
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </motion.button>
              <Badge variant="outline">Portfolio Demo</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Section Navigation */}
        <nav className="flex flex-wrap gap-2 mb-8">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                variant={activeSection === section.id ? 'primary' : 'secondary'}
                size="sm"
                leftIcon={<Icon className="w-4 h-4" />}
              >
                {section.label}
              </Button>
            );
          })}
        </nav>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'primitives' && <PrimitivesSection />}
          {activeSection === 'problem-areas' && <ProblemAreasSection />}
          {activeSection === 'visualizations' && <VisualizationsSection />}
          {activeSection === 'teacher' && <TeacherSection />}
          {activeSection === 'student-join' && <StudentJoinSection />}
          {activeSection === 'student-explore' && <StudentExploreSection />}
          {activeSection === 'student-discuss' && <StudentDiscussSection />}
          {activeSection === 'student-reflect' && <StudentReflectSection />}
          {activeSection === 'share-cards' && <ShareCardsSection />}
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// SECTION: UI Primitives
// ============================================

function PrimitivesSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [animatedProgressMode, setAnimatedProgressMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [animatedProgressStep, setAnimatedProgressStep] = useState(0);
  const [animatedProgressSelectable, setAnimatedProgressSelectable] = useState(true);

  return (
    <div className="space-y-12">
      <SectionHeader
        title="UI Primitives"
        description="Core building blocks that follow the neobrutalist design system"
      />

      {/* Buttons */}
      <div>
        <h3 className="font-bold text-lg mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" isLoading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button leftIcon={<ChevronRight className="w-4 h-4" />}>With Icon</Button>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h3 className="font-bold text-lg mb-4">Cards</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard shadow and border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral">Card content goes here.</p>
            </CardContent>
          </Card>
          <Card variant="elevated" padding="md">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Larger shadow for emphasis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral">More prominent styling.</p>
            </CardContent>
          </Card>
          <Card variant="outlined" padding="md">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>Subtle border, no shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral">Lighter visual weight.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Inputs */}
      <div>
        <h3 className="font-bold text-lg mb-4">Form Inputs</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
          <Input
            label="Text Input"
            placeholder="Enter something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            hint="This is a helpful hint"
          />
          <Input
            label="With Error"
            placeholder="Invalid input"
            error="This field is required"
          />
          <div className="md:col-span-2">
            <Textarea
              label="Textarea with Counter"
              placeholder="Write your thoughts..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={3}
              charCount
              maxLength={500}
            />
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div>
        <h3 className="font-bold text-lg mb-4">Toggles</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-6">
            <Toggle checked={false} onChange={() => {}} label="Off" />
            <Toggle checked={true} onChange={() => {}} label="On" />
            <Toggle checked={true} onChange={() => {}} label="Disabled" disabled />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Toggle checked={true} onChange={() => {}} label="Small" size="sm" />
            <Toggle checked={true} onChange={() => {}} label="Medium" size="md" />
            <Toggle checked={true} onChange={() => {}} label="Large" size="lg" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Toggle checked={true} onChange={() => {}} label="Label Right" labelPosition="right" />
            <Toggle checked={true} onChange={() => {}} label="Label Left" labelPosition="left" />
          </div>
        </div>
      </div>

      {/* Segmented Controls */}
      <div>
        <h3 className="font-bold text-lg mb-4">Segmented Controls</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-6">
            <SegmentedControl
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
              ]}
              value="a"
              onChange={() => {}}
              size="sm"
            />
            <SegmentedControl
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
              ]}
              value="b"
              onChange={() => {}}
              size="md"
            />
            <SegmentedControl
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
              ]}
              value="a"
              onChange={() => {}}
              size="lg"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <SegmentedControl
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
              ]}
              value="week"
              onChange={() => {}}
            />
            <SegmentedControl
              options={[
                { value: 'a', label: 'Disabled' },
                { value: 'b', label: 'Control' },
              ]}
              value="a"
              onChange={() => {}}
              disabled
            />
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-bold text-lg mb-4">Badges</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>

      {/* Progress */}
      <div>
        <h3 className="font-bold text-lg mb-4">Progress</h3>
        <div className="space-y-4 max-w-md">
          <Progress value={25} showLabel label="Getting started" />
          <Progress value={50} variant="primary" showLabel label="Halfway there" />
          <Progress value={75} variant="success" showLabel label="Almost done" />
          <Progress value={100} variant="success" showLabel label="Complete!" />
        </div>
        <div className="mt-6 max-w-md">
          <h4 className="font-medium mb-2">Step Progress</h4>
          <StepProgress
            currentStep={2}
            totalSteps={5}
            steps={['Read', 'Quiz', 'Position', 'Discuss', 'Reflect']}
          />
        </div>

        {/* Animated Step Progress */}
        <div className="mt-8">
          <h4 className="font-medium mb-2">Animated Step Progress</h4>
          <p className="text-sm text-neutral dark:text-gray-400 mb-4">
            Transforms from vertical list to horizontal dots with Framer Motion
          </p>
          <div className="flex items-center gap-2 mb-4">
            <SegmentedControl
              options={[
                { value: 'vertical', label: 'Vertical' },
                { value: 'horizontal', label: 'Horizontal' },
              ]}
              value={animatedProgressMode}
              onChange={setAnimatedProgressMode}
              size="sm"
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setAnimatedProgressStep((prev) => (prev + 1) % 5)}
            >
              Next Step
            </Button>
            <div className="ml-2">
              <Toggle
                checked={animatedProgressSelectable}
                onChange={setAnimatedProgressSelectable}
                label="Selectable"
                labelPosition="left"
                size="sm"
              />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 max-w-md">
            <AnimatedStepProgress
              steps={[
                { id: 'explore', label: 'Explore Policies', description: 'Read about civic issues' },
                { id: 'position', label: 'Share Opinion', description: 'Tell us what you think' },
                { id: 'discuss', label: 'Discuss', description: 'Engage with classmates' },
                { id: 'revise', label: 'Reflect & Revise', description: 'Update your views' },
                { id: 'profile', label: 'Get Profile', description: 'Share your journey' },
              ]}
              currentStep={animatedProgressStep}
              mode={animatedProgressMode}
              selectable={animatedProgressSelectable}
              onStepClick={(index) => setAnimatedProgressStep(index)}
            />
          </div>
        </div>
      </div>

      {/* Tooltips */}
      <div>
        <h3 className="font-bold text-lg mb-4">Tooltips</h3>
        <div className="flex flex-wrap gap-6">
          <Tooltip content="This is a tooltip!">
            <span className="underline cursor-help">Hover me</span>
          </Tooltip>
          <span>
            The{' '}
            <DefinitionTooltip
              term="federal minimum wage"
              definition="The lowest hourly pay allowed by U.S. law. States can set their own minimum wage higher, but not lower."
            >
              federal minimum wage
            </DefinitionTooltip>{' '}
            is currently $7.25.
          </span>
        </div>
      </div>

      {/* Banners */}
      <div>
        <h3 className="font-bold text-lg mb-4">Banners</h3>
        <div className="space-y-4 max-w-2xl">
          <Banner variant="info" title="Information">
            This is an informational banner for general updates or notices.
          </Banner>
          <Banner variant="tip">
            <strong>Tip:</strong> See an underlined word? Tap or hover for a definition.
          </Banner>
          <Banner variant="warning" title="Warning">
            Please save your work before continuing to the next section.
          </Banner>
          <Banner variant="success" title="Success">
            Your position has been submitted successfully!
          </Banner>
          <Banner variant="error" title="Error">
            Unable to save your response. Please try again.
          </Banner>
          <div className="pt-2">
            <h4 className="font-medium mb-2">Inline Banners</h4>
            <div className="flex flex-wrap gap-3">
              <InlineBanner variant="info">3 new comments</InlineBanner>
              <InlineBanner variant="success">Completed</InlineBanner>
              <InlineBanner variant="warning">Needs review</InlineBanner>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <div>
        <h3 className="font-bold text-lg mb-4">Modals</h3>
        <div className="flex gap-4">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Delete Something
          </Button>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
          description="This is a modal dialog"
        >
          <p className="text-neutral mb-4">
            Modal content goes here. You can put any components inside.
          </p>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>

        <ConfirmModal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => setConfirmOpen(false)}
          title="Confirm Deletion"
          message="Are you sure you want to delete this? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </div>
  );
}

// ============================================
// SECTION: Problem Areas
// ============================================

function ProblemAreasSection() {
  const [selectedRating, setSelectedRating] = useState<ImplementationRating | undefined>(undefined);
  const [selectedRating2, setSelectedRating2] = useState<ImplementationRating | undefined>(1);

  const mockTradeoffs: Tradeoffs = {
    benefits: [
      'Higher pay for approximately 30 million workers',
      'Less reliance on government assistance programs',
      'More money flowing into local economies',
    ],
    costs: [
      'Some businesses might cut hours or jobs',
      'Prices could rise to cover higher labor costs',
      'Impact varies significantly by region',
    ],
  };

  const mockVoicesSupport: Voice[] = [
    { persona: 'Fast Food Worker', argument: 'I work 40 hours a week and still can\'t afford rent. This would change my life.' },
    { persona: 'Labor Economist', argument: 'Studies show moderate minimum wage increases boost consumer spending without significant job losses.' },
    { persona: 'Small Business Owner', argument: 'When my workers earn more, they spend more in our community. It\'s good for everyone.' },
  ];

  const mockVoicesOpposition: Voice[] = [
    { persona: 'Restaurant Owner', argument: 'I\'m already operating on thin margins. I\'d have to raise prices or cut staff.' },
    { persona: 'Rural Business Advocate', argument: '$17 makes sense in NYC but would devastate small-town businesses where costs are lower.' },
    { persona: 'Free Market Economist', argument: 'Price floors create inefficiencies. Let the market determine wages based on productivity.' },
  ];

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Problem Areas Components"
        description="Components for the implementation approach explorer - neobrutalist style"
      />

      {/* Rating Scale */}
      <div>
        <h3 className="font-bold text-lg mb-4">Rating Scale</h3>
        <p className="text-neutral dark:text-gray-400 mb-4">
          Face-based rating scale for gauging user opinion without color bias.
        </p>
        <div className="max-w-xl">
          <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-black dark:text-white mb-4">
              What do you think?
            </h4>
            <RatingScale
              value={selectedRating}
              onChange={setSelectedRating}
            />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">With selection</h4>
          <div className="max-w-xl">
            <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
              <RatingScale
                value={selectedRating2}
                onChange={setSelectedRating2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Input (text labels) */}
      <div>
        <h3 className="font-bold text-lg mb-4">Rating Input (Pills)</h3>
        <div className="flex flex-wrap gap-3">
          <RatingInput value={undefined} onChange={() => {}} />
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <RatingInput value={1} onChange={() => {}} />
        </div>
      </div>

      {/* Tradeoffs Display */}
      <div>
        <h3 className="font-bold text-lg mb-4">Tradeoffs Display</h3>
        <div className="max-w-2xl">
          <TradeoffsDisplay tradeoffs={mockTradeoffs} defaultExpanded />
        </div>
      </div>

      {/* Voices / Perspectives */}
      <div>
        <h3 className="font-bold text-lg mb-4">Voices / Perspectives (2x3 Grid)</h3>
        <p className="text-neutral dark:text-gray-400 mb-4">
          Tabbed grid showing supporters and critics with neobrutalist cards.
        </p>
        <div className="max-w-2xl">
          <VoicesList
            voices_support={mockVoicesSupport}
            voices_opposition={mockVoicesOpposition}
          />
        </div>
      </div>

      {/* Preference Radar */}
      <div>
        <h3 className="font-bold text-lg mb-4">Preference Radar</h3>
        <p className="text-neutral dark:text-gray-400 mb-4">
          Radar chart showing how an implementation approach scores across preference dimensions.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
            <h4 className="font-bold mb-2">Single-Payer Medicare</h4>
            <PreferenceRadar
              focusedApproachId="healthcare-single-payer"
              approachTitles={{ 'healthcare-single-payer': 'Single-Payer' }}
              height={300}
              primaryColor="#8B5CF6"
            />
          </div>
          <div className="bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4">
            <h4 className="font-bold mb-2">Market Reforms</h4>
            <PreferenceRadar
              focusedApproachId="healthcare-market-reforms"
              approachTitles={{ 'healthcare-market-reforms': 'Market Reforms' }}
              height={300}
              primaryColor="#8B5CF6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SECTION: Visualizations
// ============================================

function VisualizationsSection() {
  // Sample data for mini charts
  const barChartData: ChartData = {
    type: 'bar',
    data: [
      { name: 'Dem', value: 69, color: '#2F3BBD' },
      { name: 'GOP', value: 95, color: '#C91A2B' },
      { name: 'Ind', value: 80, color: '#888' },
    ],
  };

  const comparisonChartData: ChartData = {
    type: 'comparison',
    data: [
      { name: 'US', value: 278 },
      { name: 'Other', value: 100 },
    ],
  };

  const trendChartData: ChartData = {
    type: 'trend',
    data: [
      { name: "'16", value: 180 },
      { name: "'20", value: 1000 },
      { name: "'24", value: 1900 },
    ],
  };

  const donutChartData: ChartData = {
    type: 'donut',
    data: [
      { name: 'Without', value: 47, color: '#C91A2B' },
      { name: 'With', value: 53, color: '#22C55E' },
    ],
  };

  // Sample policy factor scores (simulating a policy like Medicare Drug Negotiation)
  const mockPolicyScores: V2FactorScores = {
    hayek: 0.35,      // Moderate central coordination
    ostrom: 0.70,     // Federal policy for federal issue
    downs: 0.80,      // Fairly clear trade-offs
    olson: 0.55,      // Pharma lobbying risk
    keynes: 0.60,     // Some stabilizing effect
    pettit: 0.75,     // Reduces dependence on employers
    hirschman: 0.50,  // Mixed exit options
    buchanan: 0.45,   // Pharma industry losers
    polanyi: 0.85,    // Protects essential healthcare
    rawls: 0.80,      // Benefits those struggling with costs
    george: 0.70,     // Targets pharmaceutical rents
    acemoglu: 0.60,   // Opens access somewhat
    walzer: 0.75,     // Healthcare on need-basis
  };

  // Sample user weight profile (Progressive archetype)
  const mockUserWeights: V2WeightProfile = {
    hayek: 0.05,
    ostrom: 0.08,
    downs: 0.06,
    olson: 0.07,
    keynes: 0.08,
    pettit: 0.10,
    hirschman: 0.06,
    buchanan: 0.05,
    polanyi: 0.12,
    rawls: 0.15,
    george: 0.08,
    acemoglu: 0.05,
    walzer: 0.05,
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Visualizations"
        description="Data visualizations for policy analysis and user profiles"
      />

      {/* Mini Charts */}
      <div>
        <h3 className="font-bold text-lg mb-4">Mini Charts (Neobrutalist)</h3>
        <p className="text-neutral dark:text-gray-400 mb-4">
          Compact charts for stat windows and dashboards. SVG-based with neobrutalist styling.
        </p>
        <div className="grid md:grid-cols-4 gap-6">
          {/* Bar Chart */}
          <Card variant="default" padding="md">
            <h4 className="font-bold text-sm mb-2">Bar Chart</h4>
            <p className="text-xs text-neutral mb-3">Party support breakdown</p>
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4">
              <MiniBarChart data={barChartData.data} />
            </div>
            <p className="text-xs text-neutral mt-2">Use: Party splits, category comparisons</p>
          </Card>

          {/* Comparison Chart */}
          <Card variant="default" padding="md">
            <h4 className="font-bold text-sm mb-2">Comparison Chart</h4>
            <p className="text-xs text-neutral mb-3">US vs world prices</p>
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4">
              <MiniComparisonChart data={comparisonChartData.data} />
            </div>
            <p className="text-xs text-neutral mt-2">Use: Before/after, A vs B comparisons</p>
          </Card>

          {/* Trend Chart */}
          <Card variant="default" padding="md">
            <h4 className="font-bold text-sm mb-2">Trend Chart</h4>
            <p className="text-xs text-neutral mb-3">Dark money over time</p>
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4">
              <MiniTrendChart data={trendChartData.data} />
            </div>
            <p className="text-xs text-neutral mt-2">Use: Time series, growth trends</p>
          </Card>

          {/* Donut Chart */}
          <Card variant="default" padding="md">
            <h4 className="font-bold text-sm mb-2">Donut Chart</h4>
            <p className="text-xs text-neutral mb-3">Coverage breakdown</p>
            <div className="bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] p-4 flex justify-center">
              <MiniDonutChart data={donutChartData.data} />
            </div>
            <p className="text-xs text-neutral mt-2">Use: Proportions, percentages</p>
          </Card>
        </div>

        {/* Universal MiniChart component */}
        <div className="mt-6">
          <h4 className="font-medium mb-2">Universal MiniChart Component</h4>
          <p className="text-sm text-neutral dark:text-gray-400 mb-4">
            Pass any <code className="bg-gray-100 px-1 py-0.5 text-xs">ChartData</code> object and it renders the appropriate chart type.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-sm overflow-x-auto">
            <pre>{`import { MiniChart, ChartData } from '@/components/charts';

const data: ChartData = {
  type: 'trend', // 'bar' | 'comparison' | 'trend' | 'donut'
  data: [
    { name: "'22", value: 290 },
    { name: "'23", value: 450 },
    { name: "'24", value: 706 },
  ],
};

<MiniChart chart={data} />`}</pre>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div>
        <h3 className="font-bold text-lg mb-4">Policy Radar Chart</h3>
        <p className="text-neutral dark:text-gray-400 mb-4">
          Shows policy scores across 13 economic/political factors, with optional user weight overlay.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card variant="default" padding="lg">
            <h4 className="font-bold mb-2">Policy Scores Only</h4>
            <p className="text-sm text-neutral mb-4">Medicare Drug Price Negotiation</p>
            <ArchetypeRadarChart
              factorScores={mockPolicyScores}
              showWeights={false}
            />
          </Card>
          <Card variant="default" padding="lg">
            <h4 className="font-bold mb-2">With User Priorities Overlay</h4>
            <p className="text-sm text-neutral mb-4">
              <span className="inline-block w-3 h-3 bg-[#2F3BBD] mr-1" /> Policy Score
              <span className="inline-block w-3 h-3 bg-[#C91A2B] ml-3 mr-1 opacity-50" /> Your Priorities
            </p>
            <ArchetypeRadarChart
              factorScores={mockPolicyScores}
              weights={mockUserWeights}
              showWeights={true}
            />
          </Card>
        </div>
      </div>

      {/* Factor Legend */}
      <div>
        <h3 className="font-bold text-lg mb-4">Factor Reference</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Card variant="outlined" padding="md">
            <h4 className="font-bold text-[#2F3BBD] mb-2">Mechanics & Structure</h4>
            <ul className="text-sm space-y-1 text-neutral dark:text-gray-400">
              <li><strong>Hayek:</strong> Info Feasibility</li>
              <li><strong>Ostrom:</strong> Scale Match</li>
              <li><strong>Downs:</strong> Legibility</li>
              <li><strong>Olson:</strong> Anti-Capture</li>
              <li><strong>Keynes:</strong> Stability</li>
            </ul>
          </Card>
          <Card variant="outlined" padding="md">
            <h4 className="font-bold text-[#2F3BBD] mb-2">Rights & Dynamics</h4>
            <ul className="text-sm space-y-1 text-neutral dark:text-gray-400">
              <li><strong>Pettit:</strong> Non-Domination</li>
              <li><strong>Hirschman:</strong> Exit/Voice</li>
              <li><strong>Buchanan:</strong> Consent</li>
              <li><strong>Polanyi:</strong> Protection</li>
            </ul>
          </Card>
          <Card variant="outlined" padding="md">
            <h4 className="font-bold text-[#2F3BBD] mb-2">Justice & Distribution</h4>
            <ul className="text-sm space-y-1 text-neutral dark:text-gray-400">
              <li><strong>Rawls:</strong> The Floor</li>
              <li><strong>George:</strong> Rent Target</li>
              <li><strong>Acemoglu:</strong> Inclusivity</li>
              <li><strong>Walzer:</strong> Sphere Justice</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SECTION: Teacher Flow
// ============================================

function TeacherSection() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const mockCohorts: Cohort[] = [
    {
      id: '1',
      teacherId: 't1',
      name: 'Period 3 - US Government',
      gradeLevel: '11-12',
      joinCode: 'ABC-1234',
      status: 'active',
      currentPhase: 'discussion',
      pacingMode: 'teacher_controlled',
      studentCount: 24,
      createdAt: new Date(),
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-29'),
    },
    {
      id: '2',
      teacherId: 't1',
      name: 'Period 5 - US Government',
      gradeLevel: '11-12',
      joinCode: 'XYZ-5678',
      status: 'active',
      currentPhase: 'not_started',
      pacingMode: 'self_paced',
      studentCount: 22,
      createdAt: new Date(),
    },
  ];

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Teacher Flow"
        description="Dashboard, class management, and policy configuration"
      />

      {/* Cohort Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Class Cards</h3>
          <Button onClick={() => setCreateModalOpen(true)}>+ New Class</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {mockCohorts.map((cohort) => (
            <CohortCard
              key={cohort.id}
              cohort={cohort}
              onViewClass={() => {}}
              onConfigure={() => {}}
              onViewAnalytics={() => {}}
              onViewGuide={() => {}}
            />
          ))}
        </div>
      </div>

      {/* Compact Cards */}
      <div>
        <h3 className="font-bold text-lg mb-4">Compact Cards (for lists)</h3>
        <div className="space-y-2 max-w-md">
          {mockCohorts.map((cohort) => (
            <CohortCardCompact key={cohort.id} cohort={cohort} onClick={() => {}} />
          ))}
        </div>
      </div>

      {/* Policy Set Selector */}
      <div>
        <h3 className="font-bold text-lg mb-4">Policy Set Selector</h3>
        <PolicySetSelector onSelect={(ids) => console.log('Selected:', ids)} />
      </div>

      {/* Create Modal */}
      <CreateCohortModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateCohort={async (data) => {
          console.log('Creating cohort:', data);
          return { joinCode: 'NEW-1234', cohortId: 'new-id' };
        }}
      />
    </div>
  );
}

// ============================================
// SECTION: Student Join
// ============================================

function StudentJoinSection() {
  return (
    <div className="space-y-12">
      <SectionHeader
        title="Student Join Flow"
        description="Join a class, create profile, and get started"
      />

      <div className="max-w-md mx-auto">
        <JoinClassForm
          onJoin={async (code, profile) => {
            console.log('Joining with:', code, profile);
            return { className: 'Period 3 - US Government', teacherName: 'Ms. Johnson' };
          }}
        />
      </div>
    </div>
  );
}

// ============================================
// SECTION: Student Explore
// ============================================

function StudentExploreSection() {
  const [view, setView] = useState<'picker' | 'progress' | 'explorer' | 'position'>('picker');

  const mockPolicies = [
    { id: 'min-wage', title: '$17 Minimum Wage', hook: 'Affects my paycheck', category: 'economy' },
    { id: 'housing', title: 'Affordable Housing Supply', hook: 'Rent is wild right now', category: 'housing' },
    { id: 'background-checks', title: 'Universal Background Checks', hook: 'School safety matters to me', category: 'safety' },
    { id: 'mental-health', title: 'Mental Health 988 Lifeline', hook: 'I know people who\'ve needed this', category: 'health' },
    { id: 'right-to-repair', title: 'Right to Repair', hook: 'My phone, my rules', category: 'tech' },
    { id: 'junk-fees', title: 'Junk Fee Prevention', hook: 'Concert tickets are ridiculous', category: 'consumer' },
    { id: 'clean-energy', title: 'Clean Energy Investment', hook: 'My future climate', category: 'environment' },
    { id: 'community-college', title: 'Free Community College', hook: 'My next step', category: 'education' },
  ];

  const mockPolicyContent = {
    id: 'min-wage',
    title: '$17 Minimum Wage',
    summary: {
      simplified: 'This would make the lowest pay $17 per hour. Right now it\'s $7.25.',
      standard: 'This policy would raise the federal minimum wage to $17 per hour. Right now, it\'s $7.25 — and hasn\'t changed since 2009. Some states already have higher minimums (like California at $16), but many states follow the federal floor.',
      advanced: 'The proposed legislation would incrementally raise the federal minimum wage to $17/hour by 2028, indexed to median wage growth thereafter. The current federal minimum of $7.25/hour (unchanged since 2009) represents a 40-year inflation-adjusted low. Analysis suggests this would affect approximately 30 million workers, with varying regional impacts based on local cost-of-living differentials.',
    },
    supporters: [
      'Workers in low-wage jobs',
      'Labor unions',
      'Many economists (argue it boosts spending)',
    ],
    opponents: [
      'Some small business owners (worried about costs)',
      'Some economists (argue it could reduce jobs)',
      'Businesses in areas with lower cost of living',
    ],
    tradeoffs: {
      benefits: [
        'Higher pay for ~30 million workers',
        'Less reliance on government assistance programs',
        'More money flowing into local economies',
      ],
      concerns: [
        'Some businesses might cut hours or jobs',
        'Prices could rise to cover higher labor costs',
        'Impact varies a lot by region (NYC vs. rural Ohio)',
      ],
    },
    discussionPrompts: [
      'Should the minimum wage be the same everywhere, or should it vary by cost of living?',
      'If you work 40 hours a week, what should you be able to afford?',
      'Who\'s responsible for making sure workers can live on their wages — employers, government, or both?',
    ],
    digDeeper: [
      {
        title: 'History of the minimum wage',
        content: 'The federal minimum wage was first established in 1938 at $0.25/hour. It has been raised 22 times, most recently in 2009.',
      },
    ],
    terms: [
      { term: 'federal minimum wage', definition: 'The lowest hourly pay allowed by U.S. law. States can set their own minimum wage higher, but not lower.' },
    ],
  };

  const mockQuestions = [
    {
      id: 'q1',
      question: 'What is the current federal minimum wage?',
      options: ['$7.25', '$12.00', '$15.00', '$17.00'],
      correctIndex: 0,
      explanation: 'The federal minimum wage is $7.25 and hasn\'t changed since 2009.',
    },
    {
      id: 'q2',
      question: 'One argument AGAINST raising the minimum wage is:',
      options: [
        'Workers would make more money',
        'Some businesses might cut jobs or hours',
        'It hasn\'t changed since 2009',
      ],
      correctIndex: 1,
      explanation: 'Critics argue that higher labor costs could lead some businesses to reduce hours or positions.',
    },
    {
      id: 'q3',
      question: 'True or False: States can set their own minimum wage lower than the federal minimum.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'States can set their minimum wage higher than federal, but not lower.',
    },
  ];

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Policy Exploration"
        description="Choose policies, read content, take comprehension checks, state positions"
      />

      {/* View switcher */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={view === 'picker' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setView('picker')}
        >
          Policy Picker
        </Button>
        <Button
          variant={view === 'progress' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setView('progress')}
        >
          Progress Tracker
        </Button>
        <Button
          variant={view === 'explorer' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setView('explorer')}
        >
          Policy Explorer
        </Button>
        <Button
          variant={view === 'position' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setView('position')}
        >
          Position Form
        </Button>
      </div>

      {view === 'picker' && (
        <PolicyPicker
          policies={mockPolicies}
          onConfirm={(ids) => console.log('Selected:', ids)}
        />
      )}

      {view === 'progress' && (
        <PolicyProgress
          policies={[
            { id: 'min-wage', title: '$17 Minimum Wage', completed: { read: true, comprehension: true, position: true } },
            { id: 'housing', title: 'Affordable Housing Supply', completed: { read: true, comprehension: true, position: false } },
            { id: 'background-checks', title: 'Universal Background Checks', completed: { read: true, comprehension: false, position: false } },
            { id: 'mental-health', title: 'Mental Health 988 Lifeline', completed: { read: false, comprehension: false, position: false } },
          ]}
          onPolicyClick={(id) => console.log('Clicked:', id)}
        />
      )}

      {view === 'explorer' && (
        <PolicyExplorer
          policy={mockPolicyContent}
          questions={mockQuestions}
          onComplete={(score) => console.log('Completed with score:', score)}
          onBack={() => setView('progress')}
        />
      )}

      {view === 'position' && (
        <PositionForm
          policyId="min-wage"
          policyTitle="$17 Minimum Wage"
          onSubmit={(data) => console.log('Position submitted:', data)}
        />
      )}
    </div>
  );
}

// ============================================
// SECTION: Student Discuss
// ============================================

function StudentDiscussSection() {
  const mockThreads: DiscussionThread[] = [
    {
      post: {
        id: 'p1',
        cohortId: 'c1',
        policyId: 'min-wage',
        authorId: 'u1',
        authorName: 'Alex M.',
        authorStance: 'somewhat_support',
        content: 'I think this makes sense because we\'re already paying for Medicare with taxes, so why should we pay more than we have to? But I want to know more about the innovation argument.',
        createdAt: new Date(Date.now() - 3600000),
        isFlagged: false,
        replyCount: 2,
      },
      replies: [
        {
          id: 'r1',
          cohortId: 'c1',
          policyId: 'min-wage',
          authorId: 'u2',
          authorName: 'Sam K.',
          parentId: 'p1',
          content: 'But doesn\'t the VA already negotiate and they still get new drugs? I read that somewhere.',
          createdAt: new Date(Date.now() - 1800000),
          isFlagged: false,
          replyCount: 0,
        },
      ],
    },
    {
      post: {
        id: 'p2',
        cohortId: 'c1',
        policyId: 'min-wage',
        authorId: 'u3',
        authorName: 'Jordan T.',
        authorStance: 'somewhat_oppose',
        content: 'My uncle works in pharma research and he says that if drug prices go down, companies will cut research budgets first. I\'m not sure that\'s worth it even if prices go down.',
        createdAt: new Date(Date.now() - 7200000),
        isFlagged: false,
        replyCount: 1,
      },
      replies: [],
    },
  ];

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Discussion"
        description="Threaded conversations with stance visibility"
      />

      <DiscussionView
        policyId="min-wage"
        policyTitle="$17 Minimum Wage"
        posts={mockThreads}
        stanceDistribution={{ support: 72, neutral: 12, oppose: 16 }}
        totalParticipants={23}
        currentUserId="current-user"
        onPostComment={async (content, parentId) => {
          console.log('Posting:', content, parentId);
        }}
        onFlagPost={(postId) => console.log('Flagging:', postId)}
      />
    </div>
  );
}

// ============================================
// SECTION: Student Reflect
// ============================================

function StudentReflectSection() {
  const [view, setView] = useState<'revision' | 'reflection' | 'profile'>('revision');
  const [profileMode, setProfileMode] = useState<'static' | 'animated'>('animated');
  const [animT, setAnimT] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Autoplay

  const mockPolicies = [
    { id: 'min-wage', title: '$17 Minimum Wage' },
    { id: 'housing', title: 'Affordable Housing Supply' },
    { id: 'background-checks', title: 'Universal Background Checks' },
    { id: 'mental-health', title: 'Mental Health 988 Lifeline' },
  ];

  const mockProfileData = {
    studentName: 'Alex',
    topPriorities: [
      { id: 'min-wage', title: '$17 Minimum Wage' },
      { id: 'housing', title: 'Affordable Housing Supply' },
      { id: 'mental-health', title: 'Mental Health 988 Lifeline' },
    ],
    quote: "These three issues are all connected for me. My older sister works full-time but still can't afford her own place. She has to juggle multiple jobs and still struggles to pay for healthcare. I think if we addressed housing and wages together, it would help so many families like mine.",
    stats: {
      policiesExplored: 8,
      discussionsJoined: 6,
      positionsRevised: 2,
    },
  };

  // Animation playback effect
  useEffect(() => {
    if (!isPlaying || profileMode !== 'animated') return;
    const duration = 5000; // 5 seconds total animation
    const startTime = Date.now() - animT * duration;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setAnimT(progress);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setIsPlaying(false);
      }
    };

    const frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, animT, profileMode]);

  // Autoplay when switching to profile view with animated mode
  useEffect(() => {
    if (view === 'profile' && profileMode === 'animated') {
      setAnimT(0);
      setIsPlaying(true);
    }
  }, [view, profileMode]);

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Reflection & Profile"
        description="Revise positions, final reflection, shareable civic profile"
      />

      {/* View switcher */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={view === 'revision' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setView('revision')}
        >
          Position Revision
        </Button>
        <Button
          variant={view === 'reflection' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setView('reflection')}
        >
          Final Reflection
        </Button>
        <Button
          variant={view === 'profile' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setView('profile')}
        >
          Civic Profile
        </Button>
      </div>

      {view === 'revision' && (
        <div className="max-w-2xl mx-auto">
          <h3 className="font-display text-xl font-black mb-4">Reflect & Revise</h3>
          <p className="text-neutral mb-6">
            You&apos;ve discussed these policies with your classmates. Has your thinking changed?
          </p>
          <PositionRevisionForm
            policyId="min-wage"
            policyTitle="$17 Minimum Wage"
            originalStance="strongly_support"
            onSubmit={(data) => console.log('Revision:', data)}
          />
        </div>
      )}

      {view === 'reflection' && (
        <ReflectionForm
          policies={mockPolicies}
          onSubmit={(data) => console.log('Reflection:', data)}
        />
      )}

      {view === 'profile' && (
        <div className="max-w-2xl mx-auto">
          {/* Mode toggle */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-bold">Mode:</span>
            <button
              type="button"
              onClick={() => setProfileMode('static')}
              className={cn(
                'text-sm font-bold px-3 py-1 border-2 border-black',
                profileMode === 'static' ? 'bg-gray-200' : 'bg-white'
              )}
            >
              Static
            </button>
            <button
              type="button"
              onClick={() => setProfileMode('animated')}
              className={cn(
                'text-sm font-bold px-3 py-1 border-2 border-black flex items-center gap-1',
                profileMode === 'animated' ? 'bg-gray-200' : 'bg-white'
              )}
            >
              <Sparkles className="w-3 h-3" />
              Animated
            </button>
          </div>

          {/* Profile display */}
          {profileMode === 'static' ? (
            <CivicProfile {...mockProfileData} />
          ) : (
            <div className="relative">
              {/* Animated card container */}
              <div className="border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <CivicProfileShareCardVideo
                  {...mockProfileData}
                  t={animT}
                  urlText="civic-engine.app"
                />
              </div>

              {/* Playback controls */}
              <div className="mt-4 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (animT >= 1) setAnimT(0);
                      setIsPlaying(!isPlaying);
                    }}
                    className="p-2 bg-[#2F3BBD] text-white border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setAnimT(0);
                      setTimeout(() => setIsPlaying(true), 50);
                    }}
                    className="p-2 bg-white border-2 border-black hover:bg-gray-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <div className="flex-1 h-4 bg-gray-200 border-2 border-black relative">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#2F3BBD]"
                      style={{ width: `${animT * 100}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={animT}
                      onChange={(e) => {
                        setIsPlaying(false);
                        setAnimT(parseFloat(e.target.value));
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-sm font-mono font-black text-black w-12 text-right">
                    {(animT * 5).toFixed(1)}s
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// SECTION: Share Cards
// ============================================

function ShareCardsSection() {
  const [studentAnimT, setStudentAnimT] = useState(0);
  const [studentPlaying, setStudentPlaying] = useState(true);
  const [teacherAnimT, setTeacherAnimT] = useState(0);
  const [teacherPlaying, setTeacherPlaying] = useState(true);

  const studentData = {
    studentName: 'Alex',
    topPriorities: [
      { id: 'min-wage', title: '$17 Minimum Wage' },
      { id: 'housing', title: 'Affordable Housing Supply' },
      { id: 'mental-health', title: 'Mental Health 988 Lifeline' },
    ],
    quote: "These three issues are all connected for me. My older sister works full-time but still can't afford her own place. She has to juggle multiple jobs and still struggles to pay for healthcare. I think if we addressed housing and wages together, it would help so many families like mine.",
    stats: {
      policiesExplored: 8,
      discussionsJoined: 6,
      positionsRevised: 2,
    },
  };

  const teacherData = {
    teacherName: 'Ms. Johnson',
    className: 'AP Government Period 3',
    topPolicies: [
      { id: 'min-wage', title: '$17 Minimum Wage', studentCount: 18 },
      { id: 'background-checks', title: 'Universal Background Checks', studentCount: 15 },
      { id: 'medicare-drugs', title: 'Medicare Drug Negotiation', studentCount: 12 },
    ],
    stats: {
      totalStudents: 28,
      positionsSubmitted: 168,
      discussionPosts: 94,
      positionsRevised: 23,
    },
  };

  // Student animation effect
  useEffect(() => {
    if (!studentPlaying) return;
    const duration = 5000;
    const startTime = Date.now() - studentAnimT * duration;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setStudentAnimT(progress);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setStudentPlaying(false);
      }
    };

    const frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [studentPlaying, studentAnimT]);

  // Teacher animation effect
  useEffect(() => {
    if (!teacherPlaying) return;
    const duration = 5000;
    const startTime = Date.now() - teacherAnimT * duration;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setTeacherAnimT(progress);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTeacherPlaying(false);
      }
    };

    const frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [teacherPlaying, teacherAnimT]);

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Share Cards"
        description="Animated shareable cards for students and teachers to share their civic profiles"
      />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Student Civic Profile */}
        <div>
          <h3 className="font-bold text-lg mb-4">Student Civic Profile</h3>
          <div className="relative">
            <div className="border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <CivicProfileShareCardVideo
                {...studentData}
                t={studentAnimT}
                urlText="civic-engine.app"
              />
            </div>

            {/* Playback controls */}
            <div className="mt-4 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (studentAnimT >= 1) setStudentAnimT(0);
                    setStudentPlaying(!studentPlaying);
                  }}
                  className="p-2 bg-[#2F3BBD] text-white border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {studentPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStudentPlaying(false);
                    setStudentAnimT(0);
                    setTimeout(() => setStudentPlaying(true), 50);
                  }}
                  className="p-2 bg-white border-2 border-black hover:bg-gray-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <div className="flex-1 h-4 bg-gray-200 border-2 border-black relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#2F3BBD]"
                    style={{ width: `${studentAnimT * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={studentAnimT}
                    onChange={(e) => {
                      setStudentPlaying(false);
                      setStudentAnimT(parseFloat(e.target.value));
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-sm font-mono font-black text-black w-12 text-right">
                  {(studentAnimT * 5).toFixed(1)}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Class Profile */}
        <div>
          <h3 className="font-bold text-lg mb-4">Teacher Class Profile</h3>
          <div className="relative">
            <div className="border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden" style={{ aspectRatio: '1/1' }}>
              <ClassProfileShareCardVideo
                {...teacherData}
                t={teacherAnimT}
                urlText="civic-engine.app"
              />
            </div>

            {/* Playback controls */}
            <div className="mt-4 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (teacherAnimT >= 1) setTeacherAnimT(0);
                    setTeacherPlaying(!teacherPlaying);
                  }}
                  className="p-2 bg-[#2F3BBD] text-white border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {teacherPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTeacherPlaying(false);
                    setTeacherAnimT(0);
                    setTimeout(() => setTeacherPlaying(true), 50);
                  }}
                  className="p-2 bg-white border-2 border-black hover:bg-gray-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <div className="flex-1 h-4 bg-gray-200 border-2 border-black relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#2F3BBD]"
                    style={{ width: `${teacherAnimT * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={teacherAnimT}
                    onChange={(e) => {
                      setTeacherPlaying(false);
                      setTeacherAnimT(parseFloat(e.target.value));
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-sm font-mono font-black text-black w-12 text-right">
                  {(teacherAnimT * 5).toFixed(1)}s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Helper Components
// ============================================

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b-2 border-black dark:border-gray-700 pb-4 mb-8">
      <h2 className="font-display text-3xl font-black text-neutral-dark dark:text-white">
        {title}
      </h2>
      <p className="text-neutral dark:text-gray-400 mt-1">{description}</p>
    </div>
  );
}
