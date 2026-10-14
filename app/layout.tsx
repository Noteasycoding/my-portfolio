import './globals.css';
import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Shell } from '@/components/workspace/shell';
import { profile } from '@/content/profile';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const title = `${profile.name}, ${profile.role}`;
const description =
  'Software engineer building web and mobile apps with React, React Native and Node.js. Ask the terminal about projects, stack and experience.';

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: ['Software Engineer', 'React Native', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
  authors: [{ name: profile.fullName }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.siteUrl,
    siteName: `${profile.name} · portfolio`,
    title,
    description,
    images: [{ url: '/assets/images/profile-image.jpeg', alt: profile.name }],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: ['/assets/images/profile-image.jpeg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#111110' },
    { media: '(prefers-color-scheme: light)', color: '#f6f6f3' },
  ],
};

/**
 * Runs before first paint. Decides whether this visit plays the `whoami`
 * intro: first visit this session, home page without a ?q= deep link, and
 * motion allowed. A timeout guarantees content is never left hidden.
 */
const introScript = `(function(){try{var d=document.documentElement;if(location.pathname!=='/'||location.search.indexOf('q=')>-1)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(sessionStorage.getItem('zk:intro')==='1')return;sessionStorage.setItem('zk:intro','1');d.setAttribute('data-intro','play');setTimeout(function(){d.removeAttribute('data-intro')},4000)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Shell>{children}</Shell>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
