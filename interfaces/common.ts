export type Option = {
	name: string;
	label: string;
	href: string;
	icon?: string;
	onClick?: () => void;
};

export interface AuthSession {
	accessToken?: string;
	user?: UserType;
}

export interface LoginRequest {
	email: string;
	password: string;
}

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
