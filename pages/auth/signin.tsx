import { SignInScreen } from 'components/screens';
import NextAuthProvidersEnum from 'const/auth';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import authUtils from 'utils/auth';

const SignIn = (): JSX.Element => {
	return <SignInScreen providers={[NextAuthProvidersEnum.CREDENTIALS]} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	let redirectPath = undefined;
	if (session && session.user)
		redirectPath = {
			destination: authUtils.getPathToRedirectLoggedUser(),
			permanent: false,
		};

	return {
		props: {},
		redirect: redirectPath,
	};
};

export default SignIn;
