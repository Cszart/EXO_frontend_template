import RolesScreen from 'components/screens/settings/roles';

const RolesPage = (): JSX.Element => {
	return <RolesScreen />;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const session = await getSession(context);

// 	const redirect: Redirect | undefined = await withAuthorizationServerSide({
// 		session: session,
// 		allowedRoles: crudRoles(),
// 		allowedRoles: [RolesEnum.ADMIN],
// 		redirectTo: AppRoutes.HOME,
// 	});

// 	return {
// 		props: {},
// 		redirect: redirect,
// 	};
// };

// export default withAuthorization(
// 	Roles,
// 	crudRoles(),
// 	[RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default RolesPage;
