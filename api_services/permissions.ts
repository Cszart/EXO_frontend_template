import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { HttpResponse } from 'interfaces/httpClient';
import { PermissionI } from 'interfaces';

/**
 * This class should hold all the routes to the endpoints that are
 * related to permissions handling inside the app.
 *
 * Note: Routes might change depending on the project
 * so its needed to check those before using it
 */
class PermissionsService {
	constructor(private client: AxiosInstance) {}

	async getAll(): Promise<HttpResponse<PermissionI[]>> {
		return this.client.get('/permissions');
	}
}

export const permissionService = new PermissionsService(axiosClient);
