import PermissionsEnum from 'const/permissions';
import RolesEnum from 'const/role';

// General user structure/payload
export interface UserI {
	id: number;
	email: string;
	username: string;
	name: string;
	image: string;
	roles: RolesEnum[] | string[];
	permissions: PermissionsEnum[] | string[];
}
