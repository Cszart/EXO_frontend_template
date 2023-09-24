import { UserType } from './user';

export interface AuthSession {
	accessToken?: string;
	user?: UserType;
}

export interface LoginRequest {
	email: string;
	password: string;
}
