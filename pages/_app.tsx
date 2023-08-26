import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

// Styles
import '../styles/globals.css';
import '../styles/home.css';
import '../styles/global-tailwind.css';
import '../styles/globals.scss';
import Head from 'next/head';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps): any {
	return (
		<>
			<Head>
				<title>Frontend template</title>
			</Head>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}
