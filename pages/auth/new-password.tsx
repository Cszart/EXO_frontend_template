import { NewPasswordScreen } from 'components/screens';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import authUtils from 'utils/auth';

const NewPassword = (): JSX.Element => {
	return <NewPasswordScreen />;
};

// If user already has a session
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

export default NewPassword;
