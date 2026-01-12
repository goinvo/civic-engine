import { notFound } from 'next/navigation';
import { policies } from '@/data/policies';
import PolicyExpandedContent from '@/components/PolicyExpandedContent';

export function generateStaticParams() {
  return policies.map((policy) => ({
    id: policy.id,
  }));
}

export default async function PolicyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policies.find(p => p.id === id);

  if (!policy) {
    notFound();
  }

  return <PolicyExpandedContent policy={policy} />;
}
