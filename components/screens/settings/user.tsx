/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Layout } from 'components/layout';
import { Option, UserI } from 'interfaces';
import SimpleTable from 'components/common/tables/simpleTable';
import { rolesService, userService } from 'api_services';
import useModal from 'hooks/useModal';
import { useForm } from 'react-hook-form';
import { InputList, InputText } from 'components/form';
import { Button } from 'components/common';
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
	const [rolesData, setRolesData] = useState<Option[]>([]);
	const [editUser, setEditUser] = useState<UserI | undefined>();

	// - Functions
	// Create user handler - TODO: implement own logic
	const handleSubmitData = async (formData: any): Promise<void> => {
		if (editUser) {
			const updateResponse = await userService.update(editUser.id, {
				name: formData.name,
				email: formData.email,
				username: formData.username,
				image: formData.image,
				roles: [formData.role],
			});

			alert(updateResponse.message);
		} else {
			const createResponse = await userService.create({
				name: formData.name,
				email: formData.email,
				username: formData.username,
				image: formData.image,
				roles: [formData.role],
				permissions: crudPermissions(),
			});

			alert(createResponse.message);
		}

		hideCreateUser();
		reset();
		setEditUser(undefined);
	};

	// Function to handle editing a user
	const handleEditUser = (user: UserI): void => {
		// Set the initial values for the form fields
		setValue('name', user.name);
		setValue('email', user.email);
		setValue('username', user.username);
		setValue('image', user.image);
		setEditUser(user);

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
				const optionsAux: Option[] = [
					{
						name: '',
						label: 'Select a role',
						placeholder: true,
					},
				];

				rolesRespose.data.map((role) => {
					optionsAux.push({
						label: role.role,
						name: role.role,
					});
				});
				setRolesData(optionsAux);
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
						customPlaceholder="Email"
					/>
					<InputText
						register={register}
						name="username"
						title="Username"
						customPlaceholder="Username"
					/>
					<InputList
						register={register}
						name="role"
						title="Role"
						options={rolesData}
						myDefaultValue={editUser?.roles[0]}
						setValueInput={setValue}
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
								setEditUser(undefined);
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
