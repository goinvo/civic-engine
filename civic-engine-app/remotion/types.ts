export type PolicyWrappedRenderPolicy = {
  id: string;
  title: string;
  category: string;
  averageSupport: number;
};

export type PolicyWrappedRenderProps = {
  displayName: string;
  label: string;
  avgScore: number;
  scoreLabel?: string;
  policies: PolicyWrappedRenderPolicy[];
  urlText?: string;
};


