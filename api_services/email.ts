import { AxiosInstance } from 'axios';
import axiosClient from './axiosClientConfig';
import { EmailTemplate } from 'interfaces';

/**
 * This class should hold all the routes to the endpoints that are
 * related to email templates handling.
 *
 * Note: Routes might change depending on the project
 * so its needed to check those before using it
 */
class EmailService {
	constructor(private client: AxiosInstance) {}

	async saveTemplate(html: string): Promise<any> {
		return this.client.post('/email/save', { html });
	}

	// NOTE: implementation might change per project this is just an example
	// Might be useful to handle pagination
	async getTemplates(): Promise<{
		status: number;
		message: string;
		data: EmailTemplate[];
	}> {
		return this.client.get('/email/template');
	}
}

export const emailService = new EmailService(axiosClient);
