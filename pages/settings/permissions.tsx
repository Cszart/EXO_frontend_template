import PermissionsScreen from 'components/screens/settings/permissions';

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

// export default withAuthorization(
// 	Permissions,
// 	crudPermissions(),
// 	[RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default PermissionsPage;
