import '@/styles/globals.css';
import { NextLayout, NextProvider } from './providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HoneyMap',
  description: 'Next.js 13을 이용한 맛집 지도 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
