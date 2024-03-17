import '@/styles/globals.css';
import { NextLayout, NextProvider } from './providers';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'HoneyMap',
  description: 'Next.js 13을 이용한 맛집 지도 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <NextProvider>
            <NextLayout>{children}</NextLayout>
          </NextProvider>
        </Suspense>
      </body>
    </html>
  );
}
