import { useState, useEffect } from 'react';
import { Layout } from 'components/layout';
import { PermissionI } from 'interfaces';
import { permissionService } from 'api_services';
import SimpleTable from 'components/common/tables/simpleTable';
import useModal from 'hooks/useModal';
import { useForm } from 'react-hook-form';
import { InputText } from 'components/form';
import { Button } from 'components/common';

const PermissionsScreen = (): JSX.Element => {
	// Utils
	const { register, reset, handleSubmit, setValue } = useForm({
		mode: 'onChange',
	});
	const {
		Modal: ModalCreatePermission,
		show: showCreatePermission,
		hide: hideCreatePermission,
	} = useModal();

	// Data
	const [permissionsData, setPermissionsData] = useState<PermissionI[]>();
	const [editPermissionID, setEditPermissionID] = useState<
		number | undefined
	>();

	// - Functions
	// Create permission handler - TODO: implement own logic
	const handleSubmitData = async (formData: any): Promise<void> => {
		const { category, subCategory, permission } = formData;
		const permissionUUID = `${category}:${subCategory}:${permission}`; // Should be handled by backend really, but since its a demostration

		if (editPermissionID) {
			const updateResponse = await permissionService.update(editPermissionID, {
				category,
				subCategory,
				permission,
			});

			alert(updateResponse.message);
		} else {
			const createResponse = await permissionService.create({
				uuid: permissionUUID,
				category,
				subCategory,
				permission,
			});

			alert(createResponse.message);
		}

		hideCreatePermission();
		reset();
		setEditPermissionID(undefined);
	};

	// Function to handle editing a permission
	const handleEditPermission = (permission: PermissionI): void => {
		// Set the initial values for the form fields
		setValue('category', permission.category);
		setValue('subCategory', permission.subCategory);
		setValue('permission', permission.permission);
		setEditPermissionID(permission.id);

		// Show the modal for editing the permission
		showCreatePermission();
	};

	// - UseEffects
	// Fetch permissions data and set State
	useEffect(() => {
		async function fetchPermissions(): Promise<void> {
			const permissionsResponse = await permissionService.getAll();

			if (permissionsResponse.status == 200) {
				setPermissionsData(permissionsResponse.data);
			} else {
				setPermissionsData([]);
			}
		}

		fetchPermissions();
	}, []);

	return (
		<Layout
			withHeader
			withSidebar
			title="Permissions Management"
			buttonTitle="Create a Permission"
			onClickButton={showCreatePermission}
		>
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
						header: 'Permission',
						content: (instance) => <p>{instance.permission}</p>,
					},
				]}
				rows={permissionsData}
				rowActions={() => [
					{
						label: 'Edit',
						onClick: (instance) => {
							handleEditPermission(instance);
						},
					},
					{
						label: 'Delete',
						onClick: (instance) => {
							permissionService
								.delete(instance.id)
								.then((response) => alert(response.message));
						},
					},
				]}
			/>

			<ModalCreatePermission title="Create a Permission">
				<form
					className="mt-4 space-y-4"
					onSubmit={handleSubmit(handleSubmitData)}
				>
					<InputText
						register={register}
						name="category"
						title="Category"
						customPlaceholder="Principal area where the permission belongs (EX: users) "
					/>
					<InputText
						register={register}
						name="subCategory"
						title="Sub Category"
						customPlaceholder="Write a sub category (EX: management, post, comments)"
					/>
					<InputText
						register={register}
						name="permission"
						title="Permission"
						customPlaceholder="Write permission name or action"
					/>
					<div className="flex gap-x-4 w-full justify-center mt-8">
						<Button
							label="Cancel"
							decoration="line-primary"
							size="extra-small"
							type="button"
							onClick={() => {
								hideCreatePermission();
								reset();
								setEditPermissionID(undefined);
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
			</ModalCreatePermission>
		</Layout>
	);
};

export default PermissionsScreen;
