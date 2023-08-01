import * as React from 'react';
import { Button, InputPassword, InputText, Typography } from 'components/form';
import { Separator } from 'components/separator';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

type providerTypes = 'email' | 'google' | 'facebook';

interface SignInProps {
	providers: providerTypes[];
}

export const SignInComponent: React.FC<SignInProps> = ({ providers }) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { register } = useForm({ mode: 'onChange' });

	console.log({ providers });

	const handleSubmitDataFacebook = async () => {
		setIsLoading(true);
		try {
			signIn('facebook', {
				redirect: true,
				callbackUrl: '/',
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmitDataGoogle = async () => {
		setIsLoading(true);
		try {
			signIn('google', {
				redirect: true,
				callbackUrl: '/',
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex flex-col w-full h-full justify-center items-center">
			<form className="bg-white px-12 py-10 rounded-2xl flex flex-col space-y-4 max-w-md w-full mx-auto h-full">
				<Typography type="headline-4" className="text-center">
					Sign In
				</Typography>
				<InputText
					name="email"
					title="Email"
					placeholder="Email"
					register={register}
				/>
				<InputPassword
					name="password"
					title="Password"
					placeholder="Password"
					register={register}
				/>
				<Link href="/">
					<Typography type="link-1">Forgot password?</Typography>
				</Link>
				<Button size="large" decoration="fill">
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
					{`Don't have an account?`}
					<Link href="/auth/signup">
						<span className="text-blue hover:text-dark-30 hover:underline">
							Sign up
						</span>
					</Link>
				</Typography>
			</form>
		</div>
	);
};
