import { SignInScreen } from 'components/screens';
import NextAuthProvidersEnum from 'const/auth';

const SignIn = (): JSX.Element => {
	return <SignInScreen providers={[NextAuthProvidersEnum.CREDENTIALS]} />;
};

export default SignIn;
