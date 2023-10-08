import withAuthorization from 'components/auth/withAuthorization';
import { Table } from 'components/common';
import { Typography } from 'components/form';
import { Layout } from 'components/layout';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import { roles } from 'data/tables/tableRoles';
import * as React from 'react';
import { rolesPermissions } from 'utils';

const RolesScreen = (): JSX.Element => {
	return (
		<Layout withSidebar>
			<div>
				<Typography type="headline-3" className="mb-10">
					Roles
				</Typography>
				<Table columns={Object.keys(roles[0])} rows={roles} />
			</div>
		</Layout>
	);
};

export default withAuthorization(
	RolesScreen,
	rolesPermissions(),
	[RolesEnum.ADMIN],
	AppRoutes.HOME
);
