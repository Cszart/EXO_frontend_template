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

// Wagmi Connect
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';

// Providers
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import Icons from 'const/icons';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet],
	[
		alchemyProvider({ apiKey: 'Tvh4Yuo5GEbwg4YefZeE9mqcDJ0Brgib' }),
		publicProvider(),
	]
);

// Set up wagmi config
const config = createConfig({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({
			chains,
		}),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'wagmi',
				appLogoUrl: Icons.coinbase,
			},
		}),
		// new WalletConnectConnector({
		// 	chains,
		// 	options: {
		// 		projectId: '...',
		// 	},
		// }),
	],
	publicClient,
	webSocketPublicClient,
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
AppProps): any {
	return (
		<>
			<Head>
				<title>Frontend template</title>
			</Head>
			<SessionProvider session={session}>
				<WagmiConfig config={config}>
					<Component {...pageProps} />
				</WagmiConfig>
			</SessionProvider>
		</>
	);
}
