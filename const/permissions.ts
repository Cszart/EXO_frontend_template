// Note: This enum should NOT replace backend stored permissions
// but serve as a helper to manage frontend permission related stuff
// in consequence this should be updated whenever backend creates another permission

enum PermissionsEnum {
	// CRUD for user
	USER_MANAGEMENT_VIEW = 'user:management:view',
	USER_MANAGEMENT_CREATE = 'user:management:create',
	USER_MANAGEMENT_EDIT = 'user:management:edit',
	USER_MANAGEMENT_DELETE = 'user:management:delete',

	// CRUD for roles
	ROLE_MANAGEMENT_VIEW = 'role:management:view',
	ROLE_MANAGEMENT_CREATE = 'role:management:create',
	ROLE_MANAGEMENT_EDIT = 'role:management:edit',
	ROLE_MANAGEMENT_DELETE = 'role:management:delete',

	// CRUD for permissions
	PERMISSION_MANAGEMENT_VIEW = 'permission:management:view',
	PERMISSION_MANAGEMENT_CREATE = 'permission:management:create',
	PERMISSION_MANAGEMENT_EDIT = 'permission:management:edit',
	PERMISSION_MANAGEMENT_DELETE = 'permission:management:delete',
}

export default PermissionsEnum;
