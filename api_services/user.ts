import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { HttpResponse } from 'interfaces/httpClient';
import { UserI } from 'interfaces';

/**
 * This class should hold all the routes to the endpoints that are
 * related to permissions handling inside the app.
 *
 * Note: Routes might change depending on the project
 * so its needed to check those before using it
 */
class UserService {
	constructor(private client: AxiosInstance) {}

	async getAll(): Promise<HttpResponse<UserI[]>> {
		return this.client.get('/user/all');
	}
}

export const userService = new UserService(axiosClient);
