import withAuthorization from 'components/auth/withAuthorization';
import { BasicTable, Typography } from 'components/common';
import { Layout } from 'components/layout';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { roles } from 'data/tables/tableRoles';
import * as React from 'react';

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

export default withAuthorization(
	RolesScreen,
	undefined,
	[RolesEnum.ADMIN],
	AppRoutes.HOME
);
