import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { FormspreeProvider } from '@formspree/react';

function MyApp({ Component, pageProps }: AppProps) {
  const projectId = process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID;
  if (!projectId) {
    return <Component {...pageProps} />;
  }
  return (
    <FormspreeProvider project={projectId}>
      <Component {...pageProps} />
    </FormspreeProvider>
  );
}

export default MyApp;
