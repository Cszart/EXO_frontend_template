import { Button, Separator, Typography } from 'components/common';
import { InputEmail } from 'components/form';
import InputPassword from 'components/form/input-password/input-password';
import { LayoutLogin } from 'components/layout';
import NextAuthProvidersEnum from 'const/auth';
import Icons from 'const/icons';
import AppRoutes from 'const/routes';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface SignUpProps {
	providers: NextAuthProvidersEnum[];
}

export const SignUpScreen: React.FC<SignUpProps> = ({ providers }) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	console.log({ providers });

	// Loading flag
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	// Inputs rules
	const rules = {
		email: {
			required: { value: true, message: 'This is required' },
		},
		password: {
			required: { value: true, message: 'This is required' },
		},
	};

	// Sign up
	const handleSubmitData = async (
		provider: NextAuthProvidersEnum,
		data?: FieldValues
	) => {
		setIsLoading(true);
		console.log({ data });
		try {
			if (provider === 'credentials') {
				await signIn('credentials', {
					...data,
				});
			} else {
				signIn(provider, {
					redirect: true,
					callbackUrl: '/',
				});
			}
			router.push('/');
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
					Sign Up
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
					register={register}
					rules={rules.password}
					error={errors.password}
				/>
				<Button type="submit" size="full" decoration="fill">
					Sign up
				</Button>
				<Separator text="Or" />
				<Button
					size="full"
					onClick={() => handleSubmitData(NextAuthProvidersEnum.GOOGLE)}
					disabled={isLoading}
					icon={Icons.google}
					iconLeft
					label="Sign up with Google"
				/>
				<Button
					size="full"
					onClick={() => handleSubmitData(NextAuthProvidersEnum.FACEBOOK)}
					disabled={isLoading}
					icon={Icons.facebook}
					iconLeft
					label="Sign up with Facebook"
				/>
				<Typography type="link-1">
					{`You already have an account?`}
					<Link href={AppRoutes.AUTH_SIGN_IN}>
						{' '}
						<span className="text-blue hover:text-dark-30 hover:underline">
							Sign in
						</span>
					</Link>
				</Typography>
			</form>
		</LayoutLogin>
	);
};
