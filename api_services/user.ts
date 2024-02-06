import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { HttpResponse } from 'interfaces/httpClient';
import { UserI } from 'interfaces';

/**
 * This class should hold all the routes to the endpoints that are
 * related to user handling inside the app.
 *
 * Note: Routes might change depending on the project
 * so its needed to check those before using it
 */
class UserService {
	constructor(private client: AxiosInstance) {}

	async getAll(): Promise<HttpResponse<UserI[]>> {
		return this.client.get('/users');
	}

	async getById(id: number): Promise<HttpResponse<UserI>> {
		return this.client.get(`/users/${id}`);
	}

	async create(data: UserI): Promise<HttpResponse<UserI>> {
		return this.client.post('/users', data);
	}

	async update(id: number, data: Partial<UserI>): Promise<UserI> {
		return this.client.put(`/users/${id}`, data);
	}

	async delete(id: number): Promise<HttpResponse<any>> {
		return this.client.delete(`/users/${id}`);
	}
}

export const userService = new UserService(axiosClient);
