import '@/styles/globals.css';
import { NextLayout, NextProvider } from './providers';
import { Metadata } from 'next';
import { Suspense } from 'react';
import GoogleAnalytics from './googleAnalytics';

export const metadata: Metadata = {
  title: 'HoneMap',
  description: 'Next.js 13을 이용한 맛집 지도 앱',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
          <NextProvider>
            <NextLayout>{children}</NextLayout>
          </NextProvider>
        </Suspense>
      </body>
    </html>
  );
}
