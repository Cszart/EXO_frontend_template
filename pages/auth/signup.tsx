import { Layout } from 'components/layout';
import { SignUpScreen } from 'components/screens';

const SignUp = () => {
	return (
		<Layout classNameChildren="flex items-center">
			<SignUpScreen providers={['email', 'google', 'facebook']} />
		</Layout>
	);
};

export default SignUp;
