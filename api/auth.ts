import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { AuthSession } from 'interfaces';

class Auth {
	constructor(private client: AxiosInstance) {}
	async login(email: string, password: string): Promise<AuthSession> {
		return this.client.post('/auth/login', { email, password });
	}
}

export const authService = new Auth(axiosClient);
