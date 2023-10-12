import withAuthorizationServerSide from 'components/auth/withAuthorizationServerSide';
import { BasicTable, Typography } from 'components/common';
import { Layout } from 'components/layout';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { roles } from 'data/tables/tableRoles';
import { GetServerSideProps, Redirect } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';
import { rolesPermissions } from 'utils';

const RolesScreen = (): JSX.Element => {
	return (
		<Layout withSidebar>
			<div>
				<Typography type="headline-3" className="mb-10">
					Roles
				</Typography>
				<BasicTable columns={Object.keys(roles[0])} rows={roles} />
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	const redirect: Redirect | undefined = await withAuthorizationServerSide({
		session: session,
		allowedPermissions: rolesPermissions(),
		allowedRoles: [RolesEnum.ADMIN],
		redirectTo: AppRoutes.HOME,
	});

	return {
		props: {},
		redirect: redirect,
	};
};

// export default withAuthorization(
// 	RolesScreen,
// 	rolesPermissions(),
// 	[RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default RolesScreen;
