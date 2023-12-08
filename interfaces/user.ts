import PermissionsEnum from 'const/permissions';
import RolesEnum from 'const/role';

// General user structure/payload
export interface UserType {
	id: string;
	email: string;
	username: string;
	name: string;
	image: string;
	roles: RolesEnum[];
	permissions: PermissionsEnum[];
}
