import { NavigationOptions } from 'interfaces';
import authUtils from './auth';
import { itemIsNullOrUndefined } from './common';

export function filterOptionsByRolesOrPermissions(
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
				option.subOptions = filterOptionsByRolesOrPermissions(
					option.subOptions
				);
			}

			return true;
		}

		return false;
	});
}
