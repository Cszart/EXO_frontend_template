import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { EmailTemplate } from 'interfaces';
import { HttpResponse } from 'interfaces/httpClient';

/**
 * This class should hold all the routes to the endpoints that are
 * related to email templates handling.
 *
 * Note: Routes might change depending on the project
 * so its needed to check those before using it
 */
class EmailService {
	constructor(private client: AxiosInstance) {}

	async saveTemplate(html: string): Promise<HttpResponse<EmailTemplate>> {
		return this.client.post('/email/save', { html });
	}

	// NOTE: implementation might change per project this is just an example
	// Might be useful to handle pagination
	async getTemplates(): Promise<HttpResponse<EmailTemplate[]>> {
		return this.client.get('/email/template');
	}
}

export const emailService = new EmailService(axiosClient);
