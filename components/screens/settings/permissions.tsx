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
	// Data
	const [permissionsData, setPermissionsData] = useState<PermissionI[]>();
	const { register, reset, handleSubmit } = useForm({ mode: 'onChange' });
	const {
		Modal: ModalCreatePermission,
		show: showCreatePermission,
		hide: hideCreatePermission,
	} = useModal();

	// Fetch permissions
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

	// here you can do all the logic to create a permisson
	const handleCreatePermission = (): void => {
		reset();
		hideCreatePermission();
	};

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
							alert(instance.uuid);
						},
					},
				]}
			/>
			<ModalCreatePermission title="Create a Permission">
				<form
					className="mt-4 space-y-4"
					onSubmit={handleSubmit(handleCreatePermission)}
				>
					<InputText
						register={register}
						name="category"
						title="Category"
						customPlaceholder="Category"
					/>
					<InputText
						register={register}
						name="subcategory"
						title="Sub Category"
						customPlaceholder="Sub Category"
					/>
					<InputText
						register={register}
						name="permission"
						title="Permission"
						customPlaceholder="Permission"
					/>
					<div className="flex gap-x-4 w-full justify-center mt-8">
						<Button
							label="Cancel"
							decoration="line-primary"
							size="extra-small"
							onClick={handleCreatePermission}
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
