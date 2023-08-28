import { Table } from 'components/common';
import { Typography } from 'components/form';
import { Layout } from 'components/layout';
import { roles } from 'data/tables/tableRoles';
import * as React from 'react';

const Roles = () => {
	return (
		<Layout with_sidebar>
			<div>
				<Typography type="headline-3" className="mb-10">
					Roles
				</Typography>
				<Table columns={Object.keys(roles[0])} rows={roles} />
			</div>
		</Layout>
	);
};

export default Roles;
