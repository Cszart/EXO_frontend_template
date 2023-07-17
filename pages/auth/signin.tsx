import { Button, InputPassword, InputText } from 'components/form';
import { Layout } from 'components/layout';
import { Separator } from 'components/separator';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

const SignIn = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { register } = useForm({ mode: 'onChange' });

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
		<Layout className_children="flex items-center">
			<div className="flex flex-col w-full h-full justify-center items-center">
				<form className="bg-white px-10 py-8 rounded-2xl flex flex-col space-y-4 max-w-lg mx-auto h-full">
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
					<Button size="large">Sign-up</Button>
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
			</div>
		</Layout>
	);
};

export default SignIn;
