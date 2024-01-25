import { useState, useEffect } from 'react';
import { Layout } from 'components/layout';
import { PermissionI } from 'interfaces';
import { permissionService } from 'api_services';
import SimpleTable from 'components/common/tables/simpleTable';

const PermissionsScreen = (): JSX.Element => {
	// Data
	const [permissionsData, setPermissionsData] = useState<PermissionI[]>([]);

	// Fetch permissions
	useEffect(() => {
		async function fetchPermissions(): Promise<void> {
			const permissionsResponse = await permissionService.getAll();

			if (permissionsResponse.status == 200) {
				setPermissionsData(permissionsResponse.data);
			}
		}

		fetchPermissions();
	}, []);

	return (
		<Layout withHeader withSidebar title="Permissions Management">
			<SimpleTable<PermissionI>
				columns={[
					{
						header: 'UUID',
						content: (instance) => <p>{instance.uuid}</p>,
					},
					{
						header: 'Category',
						content: (instance) => <p>{instance.category}</p>,
					},
					{
						header: 'Sub Category',
						content: (instance) => <p>{instance.subCategory}</p>,
					},
					{
						header: 'Name',
						content: (instance) => <p>{instance.permission}</p>,
					},
				]}
				rows={permissionsData}
				rowActions={() => [
					{
						label: 'Edit',
						onClick: (instance) => {
							alert(instance.uuid);
						},
					},
				]}
			/>
		</Layout>
	);
};

export default PermissionsScreen;
