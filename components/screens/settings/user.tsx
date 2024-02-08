/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Layout } from 'components/layout';
import { RoleI, UserI } from 'interfaces';
import SimpleTable from 'components/common/tables/simpleTable';
import { rolesService, userService } from 'api_services';
import useModal from 'hooks/useModal';
import { useForm } from 'react-hook-form';
import { InputText } from 'components/form';
import { Button, Dropdown } from 'components/common';
import { crudPermissions } from 'utils';

const UsersScreen = (): JSX.Element => {
	// Utils
	const { register, reset, handleSubmit, setValue } = useForm({
		mode: 'onChange',
	});
	const {
		Modal: ModalCreateUser,
		show: showCreateUser,
		hide: hideCreateUser,
	} = useModal();

	// Data
	const [usersData, setUsersData] = useState<UserI[]>();
	const [rolesData, setRolesData] = useState<RoleI[]>([]);
	const [editUserID, setEditUserID] = useState<number | undefined>();
	const [selectedRole, setSelectedRole] = useState<string | undefined>();

	// - Functions
	// Create user handler - TODO: implement own logic
	const handleSubmitData = async (formData: any): Promise<void> => {
		if (editUserID) {
			const updateResponse = await userService.update(editUserID, {
				name: formData.name,
				email: formData.email,
				username: formData.username,
				image: formData.image,
				roles: selectedRole ? [selectedRole] : undefined,
			});

			alert(updateResponse.message);
		} else {
			const createResponse = await userService.create({
				name: formData.name,
				email: formData.email,
				username: formData.username,
				image: formData.image,
				roles: selectedRole ? [selectedRole] : undefined,
				permissions: crudPermissions(),
			});

			alert(createResponse.message);
		}

		hideCreateUser();
		reset();
		setEditUserID(undefined);
		setSelectedRole(undefined);
	};

	// Function to handle editing a user
	const handleEditUser = (user: UserI): void => {
		// Set the initial values for the form fields
		setValue('name', user.name);
		setValue('email', user.email);
		setValue('username', user.username);
		setValue('image', user.image);
		setEditUserID(user.id);

		// Show the modal for editing the user
		showCreateUser();
	};

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

	// Fetch roles
	useEffect(() => {
		async function fetchRoles(): Promise<void> {
			const rolesRespose = await rolesService.getAll();

			if (rolesRespose.status == 200) {
				setRolesData(rolesRespose.data);
			} else {
				setRolesData([]);
			}
		}

		fetchRoles();
	}, []);

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
										<li key={`users-user-${instance.id}-${item}`}>{item}</li>
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
							handleEditUser(instance);
						},
					},
					{
						label: 'Delete',
						onClick: (instance) => {
							userService
								.delete(instance.id)
								.then((response) => alert(response.message));
						},
					},
				]}
			/>

			<ModalCreateUser title="Create a User">
				<form
					className="mt-4 space-y-4"
					onSubmit={handleSubmit(handleSubmitData)}
				>
					<InputText
						register={register}
						name="name"
						title="Name"
						customPlaceholder="Name"
					/>
					<InputText
						register={register}
						name="email"
						title="Email"
						customPlaceholder="Image"
					/>
					<InputText
						register={register}
						name="username"
						title="Username"
						customPlaceholder="Username"
					/>
					<InputText
						register={register}
						name="image"
						title="Image"
						customPlaceholder="Image"
					/>

					<Dropdown
						buttonContent={'Roles'}
						showChevronDownIcon={false}
						items={rolesData.map((role) => {
							return {
								name: role.role,
								label: role.role,
								onClick: () => setSelectedRole(role.uuid),
							};
						})}
					/>

					<div className="flex gap-x-4 w-full justify-center mt-8">
						<Button
							label="Cancel"
							decoration="line-primary"
							size="extra-small"
							type="button"
							onClick={() => {
								hideCreateUser();
								reset();
								setEditUserID(undefined);
								setSelectedRole(undefined);
							}}
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

export default UsersScreen;
