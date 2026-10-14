import Link from 'next/link';
import { profile } from '@/content/profile';

/**
 * A plain document page inside the workspace: a breadcrumb path, a heading and
 * the content. Each page ends with the terminal command that shows the same
 * content, so the two ways of browsing stay connected.
 */
export function PageFrame({
  path,
  title,
  intro,
  command,
  children,
  hideTitle = false,
}: {
  path: string;
  title: string;
  intro?: string;
  command?: string;
  children: React.ReactNode;
  hideTitle?: boolean;
}) {
  const segments = path.split('/').filter(Boolean);
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-24 pt-8 sm:px-8 lg:px-12 lg:pt-12">
      <nav aria-label="Breadcrumb" className="font-mono text-meta text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="transition-colors duration-2 hover:text-foreground">
              ~/{profile.handle}
            </Link>
          </li>
          {segments.map((seg, i) => {
            const href = '/' + segments.slice(0, i + 1).join('/').replace(/\.\w+$/, '');
            const last = i === segments.length - 1;
            return (
              <li key={seg} className="flex items-center gap-1">
                <span aria-hidden className="text-dim">
                  /
                </span>
                {last ? (
                  <span aria-current="page" className="text-foreground">
                    {seg}
                  </span>
                ) : (
                  <Link href={href} className="transition-colors duration-2 hover:text-foreground">
                    {seg}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {!hideTitle && (
        <header className="mt-10">
          <h1 className="text-display font-medium">{title}</h1>
          {intro && <p className="mt-5 max-w-[52ch] text-lead text-muted-foreground">{intro}</p>}
        </header>
      )}

      <div className={hideTitle ? 'mt-10' : 'mt-12'}>{children}</div>

      {command && (
        <p className="mt-16 border-t pt-5 font-mono text-[13px] text-muted-foreground">
          same thing in the terminal:{' '}
          <Link
            href={`/?q=${encodeURIComponent(command)}`}
            className="text-signal-ink transition-colors duration-2 hover:text-foreground"
          >
            ❯ {command}
          </Link>
        </p>
      )}
    </div>
  );
}
