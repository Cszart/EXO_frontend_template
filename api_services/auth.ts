import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { HttpResponse, UserI } from 'interfaces';

/**
 * This class should hold all the routes to the endpoints that are
 * related to authentication, routes might change depending on the project
 * so its needed to check those before using it
 */
class Auth {
	constructor(private client: AxiosInstance) {}

	async login(email: string, password: string): Promise<HttpResponse<UserI>> {
		return this.client.post('/auth/login', { email, password });
	}

	async loginWallet(address: string): Promise<HttpResponse<UserI>> {
		return this.client.post('/auth/login/wallet', { address });
	}

	async signUp(userData: UserI): Promise<HttpResponse<UserI>> {
		return this.client.post('/auth/signup', userData);
	}
}

export const authService = new Auth(axiosClient);
