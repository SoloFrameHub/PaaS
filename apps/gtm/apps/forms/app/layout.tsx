import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  title: 'SoloFrameHub Forms',
  description: 'SoloFrameHub application and inquiry forms',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        {children}
      </body>
    </html>
  );
}
