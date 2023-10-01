import { SignUpScreen } from 'components/screens';

const SignUp = (): JSX.Element => {
	return <SignUpScreen providers={['email', 'google', 'facebook']} />;
};

export default SignUp;
