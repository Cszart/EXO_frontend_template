import withAuthorization from 'components/auth/withAuthorization';
import RolesScreen from 'components/screens/settings/roles';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { rolesPermissions } from 'utils';

const RolesPage = (): JSX.Element => {
	return <RolesScreen />;
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

// export default RolesPage;

export default withAuthorization(
	RolesPage,
	rolesPermissions(),
	[RolesEnum.ADMIN, RolesEnum.MODERATOR],
	AppRoutes.HOME
);
