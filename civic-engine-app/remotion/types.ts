export type PolicyWrappedRenderPolicy = {
  id: string;
  title: string;
  category: string;
  averageSupport: number;
};

export type PolicyWrappedRenderProps = {
  displayName: string;
  label: string;
  avgConsensusSupport: number;
  policies: PolicyWrappedRenderPolicy[];
  urlText?: string;
};


