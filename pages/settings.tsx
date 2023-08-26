import { Table } from 'components/common';
import { Typography } from 'components/form';
import { Layout } from 'components/layout';
import { roles } from 'data/tables/tableRoles';
import * as React from 'react';

const Settings = () => {
	return (
		<Layout with_sidebar>
			<div>
				<Typography type="subtitle-1">Settings</Typography>
				<Table columns={Object.keys(roles[0])} rows={roles} />
			</div>
		</Layout>
	);
};

export default Settings;
