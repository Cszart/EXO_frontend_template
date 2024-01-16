import UsersScreen from 'components/screens/settings/user';

const UsersPage = (): JSX.Element => {
	return <UsersScreen />;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const session = await getSession(context);

// 	const redirect: Redirect | undefined = await withAuthorizationServerSide({
// 		session: session,
// 		allowedUsers: crudUsers(),
// 		allowedUsers: [UsersEnum.ADMIN],
// 		redirectTo: AppRoutes.HOME,
// 	});

// 	return {
// 		props: {},
// 		redirect: redirect,
// 	};
// };

// export default withAuthorization(
// 	UsersScreen,
// 	crudUsers(),
// 	[UsersEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default UsersPage;
