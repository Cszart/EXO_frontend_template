import { useState, useEffect } from 'react';
import { Layout } from 'components/layout';
import { RoleI } from 'interfaces';
import SimpleTable from 'components/common/tables/simpleTable';
import { rolesService } from 'api_services';
import useModal from 'hooks/useModal';
import { InputText } from 'components/form';
import { useForm } from 'react-hook-form';
import { Button } from 'components/common';

const RolesScreen = (): JSX.Element => {
	//Utils
	const { register, reset, handleSubmit, setValue } = useForm({
		mode: 'onChange',
	});
	const {
		Modal: ModalCreateRole,
		show: showCreateRole,
		hide: hideCreateRole,
	} = useModal();

	// Data
	const [rolesData, setRolesData] = useState<RoleI[]>();
	const [editRoleID, setEditRoleID] = useState<number | undefined>();

	// - Functions
	// Create role handler - TODO: implement own logic
	const handleSubmitData = async (formData: any): Promise<void> => {
		const { role } = formData;

		if (editRoleID) {
			const updateResponse = await rolesService.update(editRoleID, {
				role,
			});

			alert(updateResponse.message);
		} else {
			const createResponse = await rolesService.create({
				uuid: role,
				role: role,
			});

			alert(createResponse.message);
		}

		hideCreateRole();
		reset();
	};

	// Function to handle editing a role
	const handleEditrole = (role: RoleI): void => {
		// Set the initial values for the form fields
		setValue('role', role.role);
		setEditRoleID(role.id);

		// Show the modal for editing the role
		showCreateRole();
	};

	// Fetch roles
	useEffect(() => {
		async function fetchRoles(): Promise<void> {
			const rolesResponse = await rolesService.getAll();

			if (rolesResponse.status == 200) {
				setRolesData(rolesResponse.data);
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
			title="Roles Management"
			buttonTitle="Create a Role"
			onClickButton={showCreateRole}
		>
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
							handleEditrole(instance);
						},
					},
					{
						label: 'Delete',
						onClick: (instance) => {
							rolesService
								.delete(instance.id)
								.then((response) => alert(response.message));
						},
					},
				]}
			/>
			<ModalCreateRole title="Create a Role">
				<form className="mt-4" onSubmit={handleSubmit(handleSubmitData)}>
					<InputText
						register={register}
						name="role"
						title="Role"
						customPlaceholder="Role"
					/>
					<div className="flex gap-x-4 w-full justify-center mt-8">
						<Button
							label="Cancel"
							decoration="line-primary"
							size="extra-small"
							type="button"
							onClick={() => {
								hideCreateRole();
								reset();
								setEditRoleID(undefined);
							}}
						/>
						<Button
							type="submit"
							label="Save"
							decoration="fill"
							size="extra-small"
						/>
					</div>
				</form>
			</ModalCreateRole>
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
