import { NavigationOptions } from 'interfaces';
import authUtils from './auth';
import { itemIsNullOrUndefined } from './common';

/**
 * Filter a set of options based on the user roles and permissions
 *
 * The options will be filtered based on the permissions/roles that are inside options prop
 * and the current user (session user) permissions/roles
 *
 * @param baseOptions Initial options to be filtered
 * @returns Filtered options
 */
export function filterNavigationOptionsByRolesOrPermissions(
	baseOptions: NavigationOptions[]
): NavigationOptions[] {
	return baseOptions.filter((option: NavigationOptions) => {
		// If the option has no roles or permissions specified, include it in the filtered array
		if (
			(itemIsNullOrUndefined(option.roles) || option.roles?.length == 0) &&
			(itemIsNullOrUndefined(option.permissions) ||
				option.permissions?.length == 0)
		) {
			return true;
		}

		// Check if user has permissions/roles to see this item
		const hasAnyRole = option.roles && authUtils.hasAnyRole(option.roles);
		const hasAnyPermission =
			option.permissions && authUtils.hasAnyPermission(option.permissions);

		if (hasAnyRole || hasAnyPermission) {
			// Check and filter subOptions
			if (option.subOptions && option.subOptions.length > 0) {
				option.subOptions = filterNavigationOptionsByRolesOrPermissions(
					option.subOptions
				);
			}

			return true;
		}

		return false;
	});
}
