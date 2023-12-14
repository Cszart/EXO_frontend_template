import EmailContentEditorScreen from 'components/screens/email/contentEditor';

const EmailContentEditor = (): JSX.Element => {
	return <EmailContentEditorScreen />;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const session = await getSession(context);

// 	const redirect: Redirect | undefined = await withAuthorizationServerSide({
// 		session: session,
// 		allowedPermissions: undefined,
// 		allowedRoles: [RolesEnum.MODERATOR, RolesEnum.ADMIN],
// 		redirectTo: AppRoutes.HOME,
// 	});

// 	return {
// 		props: {},
// 		redirect: redirect,
// 	};
// };

// export default withAuthorization(
// 	EmailContentEditor,
// 	undefined,
// 	[RolesEnum.MODERATOR, RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default EmailContentEditor;
