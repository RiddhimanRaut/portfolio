import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Riddhiman Raut | Forward Deployed Engineer',
  description:
    'Portfolio of Riddhiman Raut - Forward Deployed Engineer specializing in Simulations and Physics AI at Luminary Cloud. PhD in Mechanical Engineering with focus on Scientific Machine Learning.',
  keywords: [
    'Riddhiman Raut',
    'Forward Deployed Engineer',
    'Physics AI',
    'Simulations',
    'Scientific Machine Learning',
    'SciML',
    'Luminary Cloud',
  ],
  authors: [{ name: 'Riddhiman Raut' }],
  openGraph: {
    title: 'Riddhiman Raut | Forward Deployed Engineer',
    description:
      'Forward Deployed Engineer specializing in Simulations and Physics AI at Luminary Cloud.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
