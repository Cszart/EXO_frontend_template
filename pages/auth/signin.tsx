import { Layout } from 'components/layout';
import { SignInScreen } from 'components/screens';

const SignIn = () => {
	return (
		<Layout classNameChildren="flex items-center">
			<SignInScreen providers={['email']} />
		</Layout>
	);
};

export default SignIn;
