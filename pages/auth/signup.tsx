import { SignUpScreen } from 'components/screens';

const SignUp = (): JSX.Element => {
	return <SignUpScreen providers={['credentials', 'google', 'facebook']} />;
};

export default SignUp;
