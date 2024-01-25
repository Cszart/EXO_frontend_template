import { useState, useEffect } from 'react';
import { Layout } from 'components/layout';
import { RoleI } from 'interfaces';
import SimpleTable from 'components/common/tables/simpleTable';
import { rolesService } from 'api_services';

const RolesScreen = (): JSX.Element => {
	// Data
	const [rolesData, setRolesData] = useState<RoleI[]>([]);

	// Fetch roles
	useEffect(() => {
		async function fetchRoles(): Promise<void> {
			const rolesResponse = await rolesService.getAll();

			if (rolesResponse.status == 200) {
				setRolesData(rolesResponse.data);
			}
		}

		fetchRoles();
	}, []);

	return (
		<Layout withHeader withSidebar title="Roles Management">
			<SimpleTable<RoleI>
				columns={[
					{
						header: 'UUID',
						content: (instance) => <p>{instance.uuid}</p>,
					},
					{
						header: 'Role',
						content: (instance) => <p>{instance.role}</p>,
					},
					{
						header: 'Created at',
						content: (instance) => <p>{instance.createdAt}</p>,
					},
					{
						header: 'Modified at',
						content: (instance) => <p>{instance.modifiedAt}</p>,
					},
				]}
				rows={rolesData}
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const session = await getSession(context);

// 	const redirect: Redirect | undefined = await withAuthorizationServerSide({
// 		session: session,
// 		allowedRoles: crudRoles(),
// 		allowedRoles: [RolesEnum.ADMIN],
// 		redirectTo: AppRoutes.HOME,
// 	});

// 	return {
// 		props: {},
// 		redirect: redirect,
// 	};
// };

// export default withAuthorization(
// 	RolesScreen,
// 	crudRoles(),
// 	[RolesEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default RolesScreen;
