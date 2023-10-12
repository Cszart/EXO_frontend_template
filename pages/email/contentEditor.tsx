import withAuthorizationServerSide from 'components/auth/withAuthorizationServerSide';
import EmailContentEditorScreen from 'components/screens/email/contentEditor';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { GetServerSideProps, Redirect } from 'next';
import { getSession } from 'next-auth/react';

const EmailContentEditor = (): JSX.Element => {
	return <EmailContentEditorScreen />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	const redirect: Redirect | undefined = await withAuthorizationServerSide({
		session: session,
		allowedPermissions: undefined,
		allowedRoles: [RolesEnum.MODERATOR, RolesEnum.ADMIN],
		redirectTo: AppRoutes.HOME,
	});

	return {
		props: {},
		redirect: redirect,
	};
};

// export default withAuthorization(
// 	EmailContentEditor,
// 	undefined,
// 	[RolesEnum.MODERATOR, RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default EmailContentEditor;
