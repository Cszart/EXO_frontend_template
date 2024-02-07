import { UserI } from './user';

// Session interface
export interface AuthSession {
	accessToken?: string;
	user?: UserI;
}

// Login payload
export interface LoginPayload {
	email: string;
	password: string;
}
