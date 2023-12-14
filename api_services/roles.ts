import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { HttpResponse } from 'interfaces/httpClient';
import { RoleI } from 'interfaces';

/**
 * This class should hold all the routes to the endpoints that are
 * related to roles handling inside the app.
 *
 * Note: Routes might change depending on the project
 * so its needed to check those before using it
 */
class RolesService {
	constructor(private client: AxiosInstance) {}

	async getAll(): Promise<HttpResponse<RoleI[]>> {
		return this.client.get('/roles');
	}
}

export const rolesService = new RolesService(axiosClient);
