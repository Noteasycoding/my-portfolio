import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zaheer Khan - Full Stack Developer',
  description: 'Full Stack Developer specializing in React Native, MERN Stack, and Scalable Applications. Experienced in building high-performance web and mobile applications.',
  keywords: ['Full Stack Developer', 'React Native', 'MERN Stack', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Web Development', 'Mobile Development'],
  authors: [{ name: 'Zaheer Khan' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://my-portfolio-gray-beta-77.vercel.app',
    siteName: 'Zaheer Khan Portfolio',
    title: 'Zaheer Khan - Full Stack Developer',
    description: 'Full Stack Developer specializing in React Native, MERN Stack, and Scalable Applications',
    images: [
      {
        url: 'https://media.licdn.com/dms/image/v2/D5603AQFpsGvZSYGrUA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711989143607?e=1746057600&v=beta&t=aoSBiiag-wTs197UKcU0MYE6SkC62SumnaRwdDGmbg0',
        width: 800,
        height: 800,
        alt: 'Zaheer Khan'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaheer Khan - Full Stack Developer',
    description: 'Full Stack Developer specializing in React Native, MERN Stack, and Scalable Applications',
    images: ['https://media.licdn.com/dms/image/v2/D5603AQFpsGvZSYGrUA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711989143607?e=1746057600&v=beta&t=aoSBiiag-wTs197UKcU0MYE6SkC62SumnaRwdDGmbg0']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}