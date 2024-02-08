import withAuthorizationServerSide from 'components/auth/withAuthorizationServerSide';
import EmailTemplatesListScreen from 'components/screens/email/templatesList';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { GetServerSideProps, Redirect } from 'next';
import { getSession } from 'next-auth/react';

const EmailTemplatesList = (): JSX.Element => {
	return <EmailTemplatesListScreen />;
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

export default EmailTemplatesList;

// export default withAuthorization(
// 	EmailTemplatesList,
// 	undefined,
// 	[RolesEnum.MODERATOR, RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );
