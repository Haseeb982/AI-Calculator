import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';
import Footer from './components/footer';
import type React from 'react'; // Added import for React

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ai Calc',
  description: 'A beautiful calculator app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
