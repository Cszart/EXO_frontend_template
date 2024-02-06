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
	// Data
	const [rolesData, setRolesData] = useState<RoleI[]>();
	const { register, reset, handleSubmit } = useForm({ mode: 'onChange' });
	const {
		Modal: ModalCreateRole,
		show: showCreateRole,
		hide: hideCreateRole,
	} = useModal();

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

	// here you can do all the logic to create a role
	const handleCreateRol = () => {
		reset();
		hideCreateRole();
	};

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
							alert(instance.uuid);
						},
					},
				]}
			/>
			<ModalCreateRole title="Create a Role">
				<form className="mt-4" onSubmit={handleSubmit(handleCreateRol)}>
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
							onClick={handleCreateRol}
						/>
						<Button
							label="Save"
							type="submit"
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
