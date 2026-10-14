'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useWorkspace } from '@/components/workspace/workspace-context';

/**
 * Inside the terminal this runs a command in place; on a page it is a plain
 * link to the same content, so it works without the terminal and without JS.
 */
export function RunLink({
  command,
  href,
  className,
  children,
}: {
  command: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { inTerminal, run } = useWorkspace();
  if (inTerminal) {
    return (
      <button type="button" onClick={() => run(command)} className={cn('text-left', className)}>
        {children}
      </button>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isMail = href.startsWith('mailto:');
  return (
    <a
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noopener noreferrer'}
      className={className}
    >
      {children}
      {!isMail && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
