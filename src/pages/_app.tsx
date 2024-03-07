import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/Components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
