import { NavigationOptions } from 'interfaces';
import authUtils from './auth';

/**
 * This function filters the base options array based on the user's role and permissions.
 * @param baseOptions The base options array
 * @returns The filtered options array based on the user's role and permissions
 */
export function filterSidebarOptionsByRoleAndPermission(
	baseOptions: NavigationOptions[]
): NavigationOptions[] {
	try {
		const userRoles = authUtils.getUserRoles();
		const userPermissions = authUtils.getUserPermissions();

		// Filter the base options array based on the user's roles and permissions
		const filteredOptions = baseOptions.filter((option) => {
			// If the option has no roles or permissions specified, include it in the filtered array
			if (
				(!option.roles || option.roles.length === 0) &&
				(!option.permissions || option.permissions.length === 0)
			) {
				return true;
			}

			// If the user has at least one role that matches the option's roles and has all the required permissions, include it in the filtered array
			return (
				option.roles?.some((role) => userRoles.includes(role)) &&
				option.permissions?.every((permission) =>
					userPermissions.includes(permission)
				)
			);
		});

		return filteredOptions;
	} catch (error) {
		console.log('<- Error while trying to filter sidebar options : ');
		return [];
	}
}
