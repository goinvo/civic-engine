'use client';

import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

/**
 * Dynamically render a Lucide icon by name
 */
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const icons = LucideIcons as unknown as Record<
    string,
    React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>
  >;

  const IconComponent = icons[name] || icons.HelpCircle;

  return <IconComponent {...props} />;
}
