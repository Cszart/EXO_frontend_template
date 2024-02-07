import { useState, useEffect } from 'react';
import { Layout } from 'components/layout';
import { UserI } from 'interfaces';
import SimpleTable from 'components/common/tables/simpleTable';
import { userService } from 'api_services';
import useModal from 'hooks/useModal';
import { useForm } from 'react-hook-form';
import { InputText } from 'components/form';
import { Button, Dropdown } from 'components/common';

const UsersScreen = (): JSX.Element => {
	// Data
	const [usersData, setUsersData] = useState<UserI[]>();
	const { register, reset, handleSubmit } = useForm({ mode: 'onChange' });
	const {
		Modal: ModalCreateUser,
		show: showCreateUser,
		hide: hideCreateUser,
	} = useModal();

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

	// here you can do all the logic to create a role
	const handleCreateUser = (): void => {
		reset();
		hideCreateUser();
	};

	return (
		<Layout
			withHeader
			withSidebar
			title="Users Management"
			buttonTitle="Create a User"
			onClickButton={showCreateUser}
		>
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
			<ModalCreateUser title="Create a User">
				<form
					className="mt-4 space-y-4"
					onSubmit={handleSubmit(handleCreateUser)}
				>
					<InputText
						register={register}
						name="name"
						title="Name"
						customPlaceholder="Name"
					/>
					<InputText
						register={register}
						name="username"
						title="Username"
						customPlaceholder="Username"
					/>
					<Dropdown
						buttonContent={'Role'}
						showChevronDownIcon={false}
						items={[
							{
								name: 'admin',
								label: 'Admin',
							},
						]}
					/>
					<div className="flex gap-x-4 w-full justify-center mt-8">
						<Button
							label="Cancel"
							decoration="line-primary"
							size="extra-small"
							onClick={handleCreateUser}
						/>
						<Button
							label="Save"
							type="submit"
							decoration="fill"
							size="extra-small"
						/>
					</div>
				</form>
			</ModalCreateUser>
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
