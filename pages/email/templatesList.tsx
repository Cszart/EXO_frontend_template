import EmailTemplatesListScreen from 'components/screens/email/templatesList';

const EmailTemplatesList = (): JSX.Element => {
	return <EmailTemplatesListScreen />;
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
// 	EmailTemplatesList,
// 	undefined,
// 	[RolesEnum.MODERATOR, RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default EmailTemplatesList;
