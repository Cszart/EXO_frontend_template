import { Separator } from 'components/common';
import { Typography, InputEmail, Button } from 'components/form';
import InputPassword from 'components/form/input-password/input-password';
import NextAuthProvidersEnum from 'const/auth';
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
		<div className="flex flex-col w-full h-full justify-centers items-center">
			<form
				className="bg-white px-12 py-10 rounded-2xl flex flex-col space-y-4 max-w-md w-full mx-auto h-full"
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
					<Typography type="link-1" className="hover:text-dark-30">
						Forgot password?
					</Typography>
				</Link>
				<Button type="submit" size="large" decoration="fill">
					Sign in
				</Button>
				<Separator text="Or" />
				<Button
					size="large"
					onClick={handleSubmitDataGoogle}
					disabled={isLoading}
				>
					Sign in with Google
				</Button>
				<Button
					size="large"
					onClick={handleSubmitDataFacebook}
					disabled={isLoading}
				>
					Sign in with Facebook
				</Button>
				<Typography type="link-1">
					{`Don't have an account? `}
					<Link href="/auth/signup">
						{' '}
						<span className="text-blue hover:text-dark-30 hover:underline">
							Sign up
						</span>
					</Link>
				</Typography>
			</form>
		</div>
	);
};
