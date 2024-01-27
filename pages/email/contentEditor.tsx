import EmailContentEditorScreen from 'components/screens/email/contentEditor';
import EmailContentEditorAceScreen from 'components/screens/email/contentEditorAce';
import { useRouter } from 'next/router';

const EmailContentEditor = (): JSX.Element => {
	const router = useRouter();
	const { ace } = router.query;

	if (ace != null && ace != undefined && ace == 'true') {
		return <EmailContentEditorAceScreen />;
	}

	return <EmailContentEditorScreen />;
};

// ---- POSSIBLE EXPORTS ---- //

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
