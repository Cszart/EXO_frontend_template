import { UserType } from './user';

// Session interface
export interface AuthSession {
	accessToken?: string;
	user?: UserType;
}

// Login payload
export interface LoginRequest {
	email: string;
	password: string;
}

// Login response payload
export interface LoginResponse {
	status: number;
	message: string;
	user: UserType;
}
