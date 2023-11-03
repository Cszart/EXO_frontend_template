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
import { FieldValues, useForm } from 'react-hook-form';

interface SignInProps {
	providers: NextAuthProvidersEnum[];
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

	const handleSubmitData = async (
		provider: NextAuthProvidersEnum,
		data?: FieldValues
	) => {
		setIsLoading(true);
		console.log({ data });
		try {
			if (provider === NextAuthProvidersEnum.CREDENTIALS) {
				await signIn(NextAuthProvidersEnum.CREDENTIALS, {
					...data,
					redirect: true,
					callbackUrl: '/',
				});
			} else {
				signIn(provider, {
					redirect: true,
					callbackUrl: '/',
				});
			}
		} catch (error) {
			console.log(error);
			console.log('Log in ERROR: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<LayoutLogin>
			<form
				className="w-full space-y-4"
				onSubmit={handleSubmit((data) =>
					handleSubmitData(NextAuthProvidersEnum.CREDENTIALS, data)
				)}
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
					onClick={() => handleSubmitData(NextAuthProvidersEnum.GOOGLE)}
					disabled={isLoading}
					icon={Icons.google}
					iconLeft
					label="Sign in with Google"
				/>
				<Button
					size="full"
					onClick={() => handleSubmitData(NextAuthProvidersEnum.FACEBOOK)}
					disabled={isLoading}
					icon={Icons.facebook}
					iconLeft
					label="Sign in with Facebook"
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
