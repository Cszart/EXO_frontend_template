import * as React from 'react';
import { Button, InputEmail, Typography } from 'components/form';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export const ForgotPasswordComponent = () => {
	const router = useRouter();
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
	};
	// Sign in with Data
	const handleSubmitDataForm = async (data: any) => {
		console.log({ data });
		setIsLoading(true);
		try {
			await signIn('credentials', {
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
		<div className="flex flex-col w-full h-full justify-center items-center">
			<form
				className="bg-white px-12 py-10 rounded-2xl flex flex-col space-y-6 max-w-md w-full mx-auto h-full"
				onSubmit={handleSubmit(handleSubmitDataForm)}
			>
				<Typography type="headline-4" className="text-center">
					Forgot Password
				</Typography>
				<Typography type="body-1" className="text-center">
					Please enter your email and follow the steps explained in the email to
					change your password
				</Typography>
				<InputEmail
					name="email"
					title="Email"
					placeholder="Email"
					register={register}
					rules={rules.email}
					error={errors.email}
				/>
				<Button
					type="submit"
					size="large"
					decoration="fill"
					disabled={isLoading}
				>
					Continue
				</Button>
			</form>
		</div>
	);
};
