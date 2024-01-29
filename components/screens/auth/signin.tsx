import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useAccount, useConnect } from 'wagmi';

import { FieldValues, useForm } from 'react-hook-form';

import { Button, Separator, Typography } from 'components/common';
import { InputEmail } from 'components/form';
import InputPassword from 'components/form/input-password/input-password';
import { LayoutLogin } from 'components/layout';

import Icons from 'const/icons';
import NextAuthProvidersEnum from 'const/auth';
import AppRoutes from 'const/routes';
import Logger from 'utils/logger';

interface SignInProps {
	providers: NextAuthProvidersEnum[];
}

export const SignInScreen: React.FC<SignInProps> = () => {
	// Utils
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [connectAttempt, setConnectAttempt] = React.useState<boolean>(false);
	const logger = new Logger({ identifier: 'SignIn' });

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' });

	// Wallet connection
	const { address, isConnected, connector } = useAccount();

	const {
		connect,
		connectors,
		error,
		isLoading: isLoadingWallet,
		pendingConnector,
	} = useConnect();

	// Inputs rules
	const rules = {
		email: {
			required: { value: true, message: 'This is required' },
		},
		password: {
			required: { value: true, message: 'This is required' },
		},
	};

	// SUBMIT function
	const handleSubmitData = async (
		provider: NextAuthProvidersEnum,
		data?: FieldValues
	): Promise<void> => {
		setIsLoading(true);
		logger.info('Data: ', { data });

		try {
			if (provider === NextAuthProvidersEnum.CREDENTIALS) {
				await signIn(NextAuthProvidersEnum.CREDENTIALS, {
					...data,
					redirect: true,
					callbackUrl: '/',
				});
			} else {
				await signIn(provider, {
					redirect: true,
					callbackUrl: '/',
				});
			}
		} catch (error) {
			logger.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	// Check for connectors (delete)
	React.useEffect(() => {
		logger.info('Connectors: ', { connectors });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [connectors]);

	/**
	 * Check when the wallet is connected and proceed with sign in
	 * procedure for example: Checking the user attached to this address and fetch
	 * the data
	 */
	React.useEffect(() => {
		const isConnectedFunction = async (): Promise<void> => {
			if (connectAttempt && isConnected && address) {
				// Fetch user data based on address
				logger.info('User address: ', { address, connector });
				try {
					await signIn(NextAuthProvidersEnum.WALLET, {
						redirect: true,
						address,
					});
				} catch (error) {
					logger.error('There has been an error trying to log in with wallet');
				} finally {
					setConnectAttempt(false);
				}
			}
		};

		isConnectedFunction();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, connectAttempt, isConnected]);

	return (
		<LayoutLogin>
			<form
				className="w-full space-y-4"
				onSubmit={handleSubmit((data) =>
					handleSubmitData(NextAuthProvidersEnum.CREDENTIALS, data)
				)}
			>
				{/* Login Title */}
				<Typography type="headline-4" className="text-center">
					Sign In
				</Typography>

				{/* Input - email */}
				<InputEmail
					name="email"
					title="Email"
					placeholder="Email"
					register={register}
					rules={rules.email}
					error={errors.email}
				/>

				{/* Input - password */}
				<InputPassword
					name="password"
					title="Password"
					placeholder="Password"
					validate={false}
					register={register}
					rules={rules.password}
					error={errors.password}
				/>

				{/* Actions */}
				<Link href="/auth/forgot-password">
					<Typography type="link-1" className="hover:opacity-60">
						Forgot password?
					</Typography>
				</Link>

				{/* Credentials */}
				<Button type="submit" size="full" decoration="fill">
					Sign in
				</Button>

				<Separator text="Or" />

				{/* Google */}
				<Button
					size="full"
					onClick={() => handleSubmitData(NextAuthProvidersEnum.GOOGLE)}
					disabled={isLoading}
					icon={Icons.google}
					iconLeft
					label="Sign in with Google"
				/>

				{/* Facebook */}
				<Button
					size="full"
					onClick={() => handleSubmitData(NextAuthProvidersEnum.FACEBOOK)}
					disabled={isLoading}
					icon={Icons.facebook}
					iconLeft
					label="Sign in with Facebook"
				/>

				{/* Wallets */}
				{connectors.map((connector) => (
					<Button
						key={connector.id}
						size="full"
						onClick={() => {
							connect({ connector });
							setConnectAttempt(true);
						}}
						loading={isLoadingWallet && connector.id === pendingConnector?.id}
						icon={connector.options.appLogoUrl}
						iconLeft
						label={connector.name}
					/>
				))}

				{/* Error messages */}
				{error && <div>{error.message}</div>}

				{/* Register */}
				<Typography type="link-1">
					{`Don't have an account? `}
					<Link href={AppRoutes.AUTH_SIGN_UP}>
						<span className="text-blue hover:opacity-60">Sign up</span>
					</Link>
				</Typography>
			</form>
		</LayoutLogin>
	);
};
