import withAuthorization from 'components/auth/withAuthorization';
import UsersScreen from 'components/screens/settings/user';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { userPermissions } from 'utils';

const UsersPage = (): JSX.Element => {
	return <UsersScreen />;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const session = await getSession(context);

// 	const redirect: Redirect | undefined = await withAuthorizationServerSide({
// 		session: session,
// 		allowedPermissions: crudPermissions(),
// 		allowedRoles: [RolesEnum.ADMIN],
// 		redirectTo: AppRoutes.HOME,
// 	});

// 	return {
// 		props: {},
// 		redirect: redirect,
// 	};
// };

// export default UsersPage;

export default withAuthorization(
	UsersPage,
	userPermissions(),
	[RolesEnum.ADMIN, RolesEnum.MODERATOR],
	AppRoutes.HOME
);
