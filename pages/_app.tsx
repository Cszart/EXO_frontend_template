import type { AppProps } from 'next/app';

// Styles
import '../styles/global.css';
import '../styles/home.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function App({ Component, pageProps }: AppProps): any {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}
