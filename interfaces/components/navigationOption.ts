import PermissionsEnum from 'const/permissions';
import { Option } from './option';
import RolesEnum from 'const/role';

/**
 * This represents an option in the navigation side, for example
 * options for header, sidebar, etc
 */
export interface NavigationOptions extends Option {
	subOptions?: NavigationOptions[];
	permissions?: PermissionsEnum[];
	roles?: RolesEnum[];
}
