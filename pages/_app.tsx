import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

// Styles
import '../styles/home.css';
import '../styles/global-tailwind.css';
import '../styles/globals.scss';
import '../styles/globals.css';

// Lexical styles
import '../styles/lexicalTheme.css';
import '../components/lexicalEditor/ui/Dialog.css';
import '../components/lexicalEditor/ui/Input.css';
import '../components/lexicalEditor/ui/Modal.css';
import '../components/lexicalEditor/ui/TextEditorButton.css';

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
