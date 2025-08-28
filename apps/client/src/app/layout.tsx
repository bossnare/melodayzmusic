import ReactQueryProvider from '@/libs/react-query/ReactQueryProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono, Inter, Poppins } from 'next/font/google';
import '../styles/globals.css';
import './custom.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
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
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased dark:bg-background`}
      >
        {/* ambiance overlay */}
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
