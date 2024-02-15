import withAuthorizationServerSide from 'components/auth/withAuthorizationServerSide';
import EmailContentEditorScreen from 'components/screens/email/contentEditor';
import EmailContentEditorAceScreen from 'components/screens/email/contentEditorAce';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { GetServerSideProps, Redirect } from 'next';
import { getSession } from 'next-auth/react';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	const redirect: Redirect | undefined = await withAuthorizationServerSide({
		session: session,
		allowedPermissions: undefined,
		allowedRoles: [RolesEnum.ADMIN],
		redirectTo: AppRoutes.HOME,
	});

	return {
		props: {},
		redirect: redirect,
	};
};

export default EmailContentEditor;

// export default withAuthorization(
// 	EmailContentEditor,
// 	undefined,
// 	[RolesEnum.MODERATOR, RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );
