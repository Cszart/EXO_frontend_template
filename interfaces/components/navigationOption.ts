import PermissionsEnum from 'const/permissions';
import { Option } from './option';
import RolesEnum from 'const/role';

export interface NavigationOptions extends Option {
	subOptions?: NavigationOptions[];
	permissions?: PermissionsEnum[];
	roles?: RolesEnum[];
}
