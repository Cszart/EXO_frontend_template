import { Button, Separator, Typography } from 'components/common';
import { InputEmail } from 'components/form';
import InputPassword from 'components/form/input-password/input-password';
import { LayoutLogin } from 'components/layout';
import NextAuthProvidersEnum from 'const/auth';
import Icons from 'const/icons';
import AppRoutes from 'const/routes';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

type providerTypes = 'email' | 'google' | 'facebook';

interface SignInProps {
	providers: providerTypes[];
}

export const SignInScreen: React.FC<SignInProps> = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' });

	// Inputs rules
	const rules = {
		email: {
			required: { value: true, message: 'This is required' },
		},
		password: {
			required: { value: true, message: 'This is required' },
		},
	};

	// Functions
	// Sign in with FACEBOOK
	const handleSubmitDataFacebook = async (): Promise<void> => {
		setIsLoading(true);
		try {
			signIn(NextAuthProvidersEnum.FACEBOOK, {
				redirect: true,
				callbackUrl: '/',
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// Sign in with GOOGLE
	const handleSubmitDataGoogle = async (): Promise<void> => {
		setIsLoading(true);
		try {
			signIn(NextAuthProvidersEnum.GOOGLE, {
				redirect: true,
				callbackUrl: '/',
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	// Sign in with Data
	const handleSubmitDataForm = async (data: any): Promise<void> => {
		setIsLoading(true);
		try {
			await signIn(NextAuthProvidersEnum.CREDENTIALS, {
				...data,
				redirect: true,
				callbackUrl: '/',
			});
		} catch (error) {
			console.log('Log in ERROR: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<LayoutLogin>
			<form
				className="w-full space-y-4"
				onSubmit={handleSubmit(handleSubmitDataForm)}
			>
				<Typography type="headline-4" className="text-center">
					Sign In
				</Typography>
				<InputEmail
					name="email"
					title="Email"
					placeholder="Email"
					register={register}
					rules={rules.email}
					error={errors.email}
				/>
				<InputPassword
					name="password"
					title="Password"
					placeholder="Password"
					validate={false}
					register={register}
					rules={rules.password}
					error={errors.password}
				/>
				<Link href="/auth/forgot-password">
					<Typography type="link-1" className="hover:opacity-60">
						Forgot password?
					</Typography>
				</Link>
				<Button type="submit" size="full" decoration="fill">
					Sign in
				</Button>
				<Separator text="Or" />
				<Button
					size="full"
					onClick={handleSubmitDataGoogle}
					disabled={isLoading}
					icon={Icons.google}
					iconLeft
					label="Sign in with Google"
				/>
				<Button
					size="full"
					onClick={handleSubmitDataFacebook}
					disabled={isLoading}
					icon={Icons.facebook}
					iconLeft
					label="	Sign in with Facebook"
				/>
				<Typography type="link-1">
					{`Don't have an account? `}
					<Link href={AppRoutes.AUTH_SIGN_UP}>
						{' '}
						<span className="text-blue hover:opacity-60">Sign up</span>
					</Link>
				</Typography>
			</form>
		</LayoutLogin>
	);
};
