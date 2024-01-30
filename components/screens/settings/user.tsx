import { useState, useEffect } from 'react';
import { Layout } from 'components/layout';
import { UserI } from 'interfaces';
import SimpleTable from 'components/common/tables/simpleTable';
import { userService } from 'api_services';

const UsersScreen = (): JSX.Element => {
	// Data
	const [usersData, setUsersData] = useState<UserI[]>();

	// Fetch users
	useEffect(() => {
		async function fetchUsers(): Promise<void> {
			const usersResponse = await userService.getAll();

			if (usersResponse.status == 200) {
				setUsersData(usersResponse.data);
			} else {
				setUsersData([]);
			}
		}

		fetchUsers();
	}, []);

	return (
		<Layout withHeader withSidebar title="Users Management">
			<SimpleTable<UserI>
				columns={[
					{
						header: 'Name',
						content: (instance) => <p>{instance.name}</p>,
					},
					{
						header: 'Username',
						content: (instance) => <p>{instance.username}</p>,
					},
					{
						header: 'Roles',
						content: (instance) => (
							<ul>
								{instance.roles.map((item) => {
									return (
										<li key={`roles-user-${instance.id}-${item}`}>{item}</li>
									);
								})}
							</ul>
						),
					},
					{
						header: 'Permissions',
						content: (instance) => (
							<ul>
								{instance.permissions.map((item) => {
									return (
										<li key={`permissions-user-${instance.id}-${item}`}>
											{item}
										</li>
									);
								})}
							</ul>
						),
					},
				]}
				rows={usersData}
				rowActions={() => [
					{
						label: 'Edit',
						onClick: (instance) => {
							alert(instance.id);
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
// 		allowedUsers: crudUsers(),
// 		allowedUsers: [UsersEnum.ADMIN],
// 		redirectTo: AppRoutes.HOME,
// 	});

// 	return {
// 		props: {},
// 		redirect: redirect,
// 	};
// };

// export default withAuthorization(
// 	UsersScreen,
// 	crudUsers(),
// 	[UsersEnum.ADMIN],
// 	AppRoutes.HOME
// );

export default UsersScreen;
