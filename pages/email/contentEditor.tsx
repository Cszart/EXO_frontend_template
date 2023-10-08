import withAuthorization from 'components/auth/withAuthorization';
import EmailContentEditorScreen from 'components/screens/email/contentEditor';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { rolesPermissions } from 'utils';

const EmailContentEditor = (): JSX.Element => {
	return <EmailContentEditorScreen />;
};

export default withAuthorization(
	EmailContentEditor,
	rolesPermissions(),
	[RolesEnum.ADMIN],
	AppRoutes.HOME
);
