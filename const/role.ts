// NOTE: This enum should not replace ANY backend stored data about roles
// but instead work as a easy way to maintain the types in the frontend
// this enum should be updated everytime a new role is created

enum RolesEnum {
	ADMIN = 'admin',
	MODERATOR = 'moderator',
	USER = 'user',
}

export default RolesEnum;
