import withAuthorizationServerSide from 'components/auth/withAuthorizationServerSide';
import UsersScreen from 'components/screens/settings/user';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { GetServerSideProps, Redirect } from 'next';
import { getSession } from 'next-auth/react';
import { crudPermissions } from 'utils';

const UsersPage = (): JSX.Element => {
	return <UsersScreen />;
};

// ---- POSSIBLE EXPORTS ---- //

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	const redirect: Redirect | undefined = await withAuthorizationServerSide({
		session: session,
		allowedPermissions: crudPermissions(),
		allowedRoles: [RolesEnum.ADMIN],
		redirectTo: AppRoutes.HOME,
	});

	return {
		props: {},
		redirect: redirect,
	};
};

export default UsersPage;

// export default withAuthorization(
// 	UsersPage,
// 	userPermissions(),
// 	[RolesEnum.ADMIN, RolesEnum.MODERATOR],
// 	AppRoutes.HOME
// );
