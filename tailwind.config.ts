import type { Config } from 'tailwindcss';

const hsl = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Four working sizes, plus the display line.
        meta: ['0.75rem', { lineHeight: '1.1rem' }],
        body: ['1rem', { lineHeight: '1.6' }],
        lead: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        title: ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        display: ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        hero: ['clamp(3.25rem, 9.5vw, 10rem)', { lineHeight: '0.88', letterSpacing: '-0.045em' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'var(--radius)',
        sm: 'var(--radius)',
      },
      colors: {
        background: hsl('background'),
        surface: hsl('surface'),
        raised: hsl('raised'),
        foreground: hsl('foreground'),
        dim: hsl('dim'),
        signal: {
          DEFAULT: hsl('signal'),
          ink: hsl('signal-ink'),
          foreground: hsl('signal-foreground'),
        },
        sage: hsl('sage'),
        border: {
          DEFAULT: hsl('border'),
          strong: hsl('border-strong'),
        },
        card: { DEFAULT: hsl('card'), foreground: hsl('card-foreground') },
        popover: { DEFAULT: hsl('popover'), foreground: hsl('popover-foreground') },
        primary: { DEFAULT: hsl('primary'), foreground: hsl('primary-foreground') },
        secondary: { DEFAULT: hsl('secondary'), foreground: hsl('secondary-foreground') },
        muted: { DEFAULT: hsl('muted'), foreground: hsl('muted-foreground') },
        accent: { DEFAULT: hsl('accent'), foreground: hsl('accent-foreground') },
        destructive: { DEFAULT: hsl('destructive'), foreground: hsl('destructive-foreground') },
        input: hsl('input'),
        ring: hsl('ring'),
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        1: '120ms',
        2: '200ms',
        3: '280ms',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
