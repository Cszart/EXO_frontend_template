/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { InputEmail } from 'components/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Typography, Button } from 'components/common';
import { LayoutLogin } from 'components/layout';

export const ForgotPasswordScreen = (): JSX.Element => {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({ mode: 'onSubmit' });

	// Inputs rules
	const rules = {
		email: {
			required: { value: true, message: 'This is required' },
		},
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleSubmitDataForm = async (data: any): Promise<void> => {
		setIsLoading(true);
		router.push('/auth/new-password?code=1234');
	};

	return (
		<LayoutLogin>
			<form
				className="w-full space-y-4"
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
					size="full"
					decoration="fill"
					disabled={isLoading || !isDirty || !isValid}
				>
					Continue
				</Button>
			</form>
		</LayoutLogin>
	);
};
