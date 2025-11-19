import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme
      appearance="dark"
      accentColor="cyan"
      grayColor="slate"
      panelBackground="solid"
      scaling="100%"
    >
      <div className="background"></div>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </Theme>
  );
}

export default MyApp;
