import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { HttpResponse } from 'interfaces/httpClient';
import { RoleI } from 'interfaces';

/**
 * This class should hold all the routes to the endpoints that are
 * related to roles handling inside the app.
 *
 * Note: Routes might change depending on the project
 * so it's needed to check those before using it
 */
class RolesService {
	constructor(private client: AxiosInstance) {}

	async getAll(): Promise<HttpResponse<RoleI[]>> {
		return this.client.get('/roles');
	}

	async getById(id: number): Promise<HttpResponse<RoleI>> {
		return this.client.get(`/roles/${id}`);
	}

	async create(data: Partial<RoleI>): Promise<HttpResponse<RoleI>> {
		return this.client.post('/roles', data);
	}

	async update(id: number, data: Partial<RoleI>): Promise<HttpResponse<RoleI>> {
		return this.client.put(`/roles/${id}`, data);
	}

	async delete(id: number): Promise<HttpResponse<any>> {
		return this.client.delete(`/roles/${id}`);
	}
}

export const rolesService = new RolesService(axiosClient);
