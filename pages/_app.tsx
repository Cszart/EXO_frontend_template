import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

// Styles
import '../styles/global.css';
import '../styles/home.css';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps): any {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
