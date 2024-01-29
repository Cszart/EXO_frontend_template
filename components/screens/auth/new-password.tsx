import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Typography, Button, Spinner } from 'components/common';
import InputPassword from 'components/form/input-password/input-password';
import Link from 'next/link';
import AppRoutes from 'const/routes';
import { LayoutLogin } from 'components/layout';

export const NewPasswordScreen = (): JSX.Element => {
	const CODE_VALUE = '1234';
	const router = useRouter();
	const { code } = router.query;
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isValidCode, setIsValidCode] = React.useState<boolean>();
	const [isPasswordSaved, setIsPasswordSaved] = React.useState<boolean>(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isDirty, isValid },
	} = useForm({ mode: 'onChange' });

	// Inputs rules
	const rules = {
		password: {
			required: {
				value: true,
				message: 'This is required',
			},
			pattern: {
				value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
				message:
					'Requires minimum length 8 characters, 1 uppercase letter and 1 number',
			},
		},
		password_confirm: {
			required: {
				value: true,
				message: 'This is required',
			},
			validate: (value: string) =>
				value === watch('password') || 'The passwords do not match',
		},
	};

	React.useEffect(() => {
		if (code === CODE_VALUE) {
			setIsValidCode(true);
		} else {
			setIsValidCode(false);
		}
	}, [code]);

	// Sign in with Data
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	const handleSubmitDataForm = async (data: any): Promise<void> => {
		setIsLoading(true);
		setIsPasswordSaved(true);
	};

	return (
		<LayoutLogin>
			{isValidCode === undefined ? (
				<Spinner type="loadingPage" />
			) : isValidCode ? (
				isPasswordSaved ? (
					<>
						<Typography type="headline-4" className="text-center">
							New password saved!
						</Typography>
						<Typography type="body-1" className="text-center mt-6">
							Please,{' '}
							<Link
								href={AppRoutes.AUTH_SIGN_IN}
								className="underline hover:opacity-60"
							>
								Sign in here
							</Link>
						</Typography>
					</>
				) : (
					<form
						onSubmit={handleSubmit(handleSubmitDataForm)}
						className="space-y-6 w-full"
					>
						<Typography type="headline-4" className="text-center">
							New Password
						</Typography>
						<Typography type="body-1" className="text-center">
							Please enter your new password
						</Typography>
						<InputPassword
							name="password"
							title="Password"
							placeholder="Password"
							validate={false}
							register={register}
							rules={rules.password}
							error={errors.password}
						/>
						<InputPassword
							name="password_confirm"
							title="Confirm password"
							placeholder="Password"
							validate={false}
							register={register}
							rules={rules.password_confirm}
							error={errors.password_confirm}
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
				)
			) : (
				<Typography type="body-1" className="text-center">
					Sorry.This code is not valid
				</Typography>
			)}
		</LayoutLogin>
	);
};
