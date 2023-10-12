import withAuthorizationServerSide from 'components/auth/withAuthorizationServerSide';
import { BasicTable, Typography } from 'components/common';
import { Layout } from 'components/layout';
import AppRoutes from 'const/routes';
import { users } from 'data/tables/tableUser';
import { GetServerSideProps, Redirect } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';

const PermissionsScreen = (): JSX.Element => {
	return (
		<Layout withSidebar>
			<div>
				<Typography type="headline-3" className="mb-10">
					Permissions
				</Typography>
				<BasicTable columns={Object.keys(users[0])} rows={users} />
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	const redirect: Redirect | undefined = await withAuthorizationServerSide({
		session: session,
		allowedPermissions: [],
		allowedRoles: [],
		redirectTo: AppRoutes.NOT_FOUND,
	});

	return {
		props: {},
		redirect: redirect,
	};
};

// export default withAuthorization(
// 	PermissionsScreen,
// 	undefined,
// 	[RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default PermissionsScreen;
