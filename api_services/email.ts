import { AxiosInstance } from 'axios';
import { EmailTemplateI, HttpResponse } from 'interfaces';
import axiosClient from './axiosClientConfig';

/**
 * This class should hold all the routes to the endpoints that are
 * related to email templates handling.
 *
 * Note: Routes might change depending on the project
 * so its needed to check those before using it
 */
class EmailService {
	constructor(private client: AxiosInstance) {}

	async getAllTemplates(): Promise<HttpResponse<EmailTemplateI[]>> {
		return this.client.get('/email-templates');
	}

	async getTemplateById(id: number): Promise<HttpResponse<EmailTemplateI>> {
		return this.client.get(`/email-templates/${id}`);
	}

	async createTemplate(
		emailTemplateData: EmailTemplateI
	): Promise<HttpResponse<EmailTemplateI>> {
		return this.client.post('/email-templates', emailTemplateData);
	}

	async updateTemplate(
		id: number,
		updatedTemplateData: Partial<EmailTemplateI>
	): Promise<HttpResponse<EmailTemplateI>> {
		return this.client.put(`/email-templates/${id}`, updatedTemplateData);
	}

	async deleteTemplate(id: number): Promise<HttpResponse<void>> {
		return this.client.delete(`/email-templates/${id}`);
	}
}

export const emailService = new EmailService(axiosClient);
