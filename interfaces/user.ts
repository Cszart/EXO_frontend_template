import PermissionsEnum from 'const/permissions';
import RolesEnum from 'const/role';

export interface UserType {
	id: string;
	email: string;
	username: string;
	name: string;
	image: string;
	roles: RolesEnum[];
	permissions: PermissionsEnum[];
}

export interface UserTypeData {
	data: UserType;
	statusCode: number;
}
