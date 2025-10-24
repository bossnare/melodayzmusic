import ReactQueryProvider from '@/lib/react-query/ReactQueryProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Montserrat } from 'next/font/google';
import '../styles/globals.css';
import './custom.css';
import { ThemeProvider } from '@/components/themes/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MelodayzMusic - Feel the Beat, Anywhere You Go',
  other: {
    google: 'notranslate',
  },
  description:
    'MelodayzMusic is a web application designed to provide an engaging and seamless music experience for users',
  keywords: [
    'MelodayzMusic',
    'music',
    'web application',
    'streaming',
    'audio',
    'playlist',
    'user experience',
    'music discovery',
    'music player',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        {/* ambiance overlay */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AuthGuard requireAuth={false}> */}
          <ReactQueryProvider>{children}</ReactQueryProvider>
          {/* toast */}
          <Toaster richColors position="top-left" />
          {/* </AuthGuard> */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
