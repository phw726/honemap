'use client';

import { pageview } from '@/lib/gtag';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

function GoogleAnalytics({ GA_TRACKING_ID }: { GA_TRACKING_ID?: string }) {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <div className="container">
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <Script id="google-analytics" strategy="afterInteractive">
        {`  
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
    
        gtag('config', '${GA_TRACKING_ID}')
    `}
      </Script>
    </div>
  );
}

export default GoogleAnalytics;
