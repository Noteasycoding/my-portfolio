import { experience } from '@/content/experience';
import { cn } from '@/lib/utils';

/** Career history, drawn like `git log --graph`: newest commit on top. */
export function Timeline() {
  return (
    <ol aria-label="Work experience, newest first">
      {experience.map((role, i) => {
        const last = i === experience.length - 1;
        return (
          <li key={`${role.company}-${role.start}`} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3">
            <div aria-hidden className="relative flex justify-center">
              <span
                className={cn(
                  'relative z-10 mt-[0.45rem] h-2.5 w-2.5 border-2',
                  role.current ? 'border-signal bg-signal' : 'border-border-strong bg-background',
                )}
              />
              {!last && <span className="absolute bottom-[-0.45rem] top-[0.45rem] w-px bg-border-strong" />}
            </div>
            <div className={cn('min-w-0', !last && 'pb-8')}>
              <p className="font-mono text-meta text-muted-foreground">
                <span className="text-foreground">
                  {role.start} – {role.end}
                </span>
                {role.current && (
                  <span className="ml-2 text-signal-ink">
                    (HEAD <span aria-hidden>→</span>
                    <span className="sr-only">is</span> current)
                  </span>
                )}
              </p>
              <h3 className="mt-1 text-lead font-medium">
                {role.title} <span className="text-muted-foreground">at</span> {role.company}
              </h3>
              <p className="font-mono text-meta text-muted-foreground">{role.location}</p>
              <ul className="mt-3 space-y-1.5">
                {role.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-body">
                    <span aria-hidden className="font-mono text-dim">
                      –
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
