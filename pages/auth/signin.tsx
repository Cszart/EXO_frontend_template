import * as React from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

// Local components
import { Button, InputPassword, InputText } from 'components/form';
import { Layout } from 'components/layout';
import { Separator } from 'components/separator';
import { useRouter } from 'next/router';

const SignIn = (): any => {
	// Utils
	// Form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const router = useRouter();

	// Loading flag
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	// Functions
	// Sign in with FACEBOOK
	const handleSubmitDataFacebook = async (): Promise<any> => {
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

	// Sign in with GOOGLE
	const handleSubmitDataGoogle = async (): Promise<any> => {
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

	// Sign in with Data
	const handleSubmitDataForm = async (data: any): Promise<any> => {
		setIsLoading(true);
		try {
			await signIn('Credentials', {
				...data,
			});

			router.push('/');
		} catch (error) {
			console.log('Log in ERROR: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Layout className_children="flex flex-col w-full h-full justify-center items-center">
			<form
				onSubmit={handleSubmit(handleSubmitDataForm)}
				className="bg-white px-10 py-8 rounded-2xl flex flex-col space-y-4 max-w-lg mx-auto h-full"
			>
				<InputText
					name="email"
					title="Email"
					placeholder="Email"
					register={register}
					error={errors}
				/>
				<InputPassword
					name="password"
					title="Password"
					placeholder="Password"
					register={register}
					error={errors}
					validate={false}
				/>

				<Button type="submit" size="large" disabled={isLoading}>
					Sign-up
				</Button>

				<Separator text="Or" />

				<Button
					size="large"
					onClick={handleSubmitDataGoogle}
					disabled={isLoading}
				>
					Sign-up with Google
				</Button>

				<Button
					size="large"
					onClick={handleSubmitDataFacebook}
					disabled={isLoading}
				>
					Sign-up with Facebook
				</Button>
			</form>
		</Layout>
	);
};

export default SignIn;
