import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

// Styles
import '../styles/home.css';
import '../styles/global-tailwind.css';
import '../styles/globals.scss';
import '../styles/globals.css';

// Lexical styles
import '../components/text-editor/themes/default_theme.css';

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
