import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AIThemeProvider } from '@/context/AIThemeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Riddhiman Raut - Forward Deployed Engineer | Physics AI & SciML',
  description:
    'Riddhiman Raut is a Forward Deployed Engineer at Luminary Cloud specializing in physics-informed machine learning, graph neural networks, and CFD/FEA simulations. Ph.D. in Mechanical Engineering from Penn State.',
  keywords: [
    'Riddhiman Raut',
    'Forward Deployed Engineer',
    'Physics AI',
    'Scientific Machine Learning',
    'SciML',
    'Graph Neural Networks',
    'GNN',
    'CFD',
    'FEA',
    'Luminary Cloud',
    'Penn State',
    'Machine Learning Engineer',
    'Simulation Engineer',
  ],
  authors: [{ name: 'Riddhiman Raut' }],
  creator: 'Riddhiman Raut',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Riddhiman Raut - Forward Deployed Engineer',
    description:
      'Forward Deployed Engineer at Luminary Cloud. Ph.D. in Mechanical Engineering specializing in Physics AI, Scientific Machine Learning, and Graph Neural Networks.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Riddhiman Raut',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riddhiman Raut - Forward Deployed Engineer',
    description:
      'Physics AI & Scientific Machine Learning | Luminary Cloud | Penn State Ph.D.',
  },
  alternates: {
    canonical: 'https://riddhimanraut.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AIThemeProvider>{children}</AIThemeProvider>
      </body>
    </html>
  );
}
