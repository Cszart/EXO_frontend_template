export interface UserType {
	id: string;
	email: string;
	username: string;
	name: string;
	image: string;
}

export interface UserTypeData {
	data: UserType;
	statusCode: number;
}
