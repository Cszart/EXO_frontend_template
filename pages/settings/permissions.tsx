import withAuthorization from 'components/auth/withAuthorization';
import PermissionsScreen from 'components/screens/settings/permissions';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { crudPermissions } from 'utils';

const PermissionsPage = (): JSX.Element => {
	return <PermissionsScreen />;
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

// export default PermissionsPage;

export default withAuthorization(
	PermissionsPage,
	crudPermissions(),
	[RolesEnum.ADMIN, RolesEnum.MODERATOR],
	AppRoutes.HOME
);
