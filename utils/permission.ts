import PermissionsEnum from 'const/permissions';

// Functions that will return a set of permissions
// Note: They should be updated (if needed) whenever other permissions are added

export function userPermissions(): PermissionsEnum[] {
	return [
		PermissionsEnum.USER_MANAGEMENT_VIEW,
		PermissionsEnum.USER_MANAGEMENT_CREATE,
		PermissionsEnum.USER_MANAGEMENT_EDIT,
		PermissionsEnum.USER_MANAGEMENT_DELETE,
	];
}

export function rolesPermissions(): PermissionsEnum[] {
	return [
		PermissionsEnum.ROLE_MANAGEMENT_VIEW,
		PermissionsEnum.ROLE_MANAGEMENT_CREATE,
		PermissionsEnum.ROLE_MANAGEMENT_EDIT,
		PermissionsEnum.ROLE_MANAGEMENT_DELETE,
	];
}

export function crudPermissions(): PermissionsEnum[] {
	return [
		PermissionsEnum.PERMISSION_MANAGEMENT_VIEW,
		PermissionsEnum.PERMISSION_MANAGEMENT_CREATE,
		PermissionsEnum.PERMISSION_MANAGEMENT_EDIT,
		PermissionsEnum.PERMISSION_MANAGEMENT_DELETE,
	];
}

export function onlyViewPermissions(): PermissionsEnum[] {
	return [
		PermissionsEnum.ROLE_MANAGEMENT_VIEW,
		PermissionsEnum.USER_MANAGEMENT_VIEW,
		PermissionsEnum.PERMISSION_MANAGEMENT_VIEW
	];
}

export function allPermissions(): PermissionsEnum[] {
	return [
		PermissionsEnum.USER_MANAGEMENT_VIEW,
		PermissionsEnum.USER_MANAGEMENT_CREATE,
		PermissionsEnum.USER_MANAGEMENT_EDIT,
		PermissionsEnum.USER_MANAGEMENT_DELETE,
		PermissionsEnum.ROLE_MANAGEMENT_VIEW,
		PermissionsEnum.ROLE_MANAGEMENT_CREATE,
		PermissionsEnum.ROLE_MANAGEMENT_EDIT,
		PermissionsEnum.ROLE_MANAGEMENT_DELETE,
		PermissionsEnum.PERMISSION_MANAGEMENT_VIEW,
		PermissionsEnum.PERMISSION_MANAGEMENT_CREATE,
		PermissionsEnum.PERMISSION_MANAGEMENT_EDIT,
		PermissionsEnum.PERMISSION_MANAGEMENT_DELETE,
	];
}
