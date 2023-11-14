// Local components
import withAuthorizationServerSide from 'components/auth/withAuthorizationServerSide';
import { Typography } from 'components/common';
import { Layout } from 'components/layout';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { GetServerSideProps, Redirect } from 'next';
import { getSession } from 'next-auth/react';
import { crudPermissions } from 'utils';

const HomePage = (): any => {
	return (
		<Layout withSidebar>
			<div className="flex justify-center items-center h-screen w-full text-2xl font-bold">
				<Typography type="headline-2">Welcome to the Dashboard</Typography>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	console.log('<- \n\n\n\n SEssion : ', session);
	const redirect: Redirect | undefined = await withAuthorizationServerSide({
		session: session,
		allowedPermissions: crudPermissions(),
		allowedRoles: [RolesEnum.ADMIN],
		redirectTo: AppRoutes.AUTH_SIGN_IN,
	});

	return {
		props: {},
		redirect: redirect,
	};
};

export default HomePage;
