import axios from 'axios';
import { AuthSession } from 'interfaces';
import { getSession, signIn } from 'next-auth/react';

const config = axios.defaults;
config.baseURL = process.env.NEXT_PUBLIC_API;
config.headers['Content-Type'] = 'application/json';

const client = axios.create(config);

// Body Interceptor
client.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => Promise.reject(error)
);

client.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => Promise.reject(error)
);

// Auth Herder Interceptor
client.interceptors.request.use(
	async (config) => {
		const session = (await getSession()) as AuthSession;
		if (session?.accessToken) {
			config.headers['Authorization'] = `Bearer ${session.accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Data Refresh token interceptor
client.interceptors.response.use(
	async (response) => {
		if (response.headers['refresh-token']) {
			const session = (await getSession()) as AuthSession;
			signIn('credentials', {
				refreshToken: response.headers['refresh-token'],
				redirect: false,
				oldSession: JSON.stringify(session),
			});
		}
		return response;
	},
	(error) => Promise.reject(error)
);

// Data Response Interceptor
client.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		console.log(error);
		return Promise.reject({
			...error?.response?.data,
			status: error?.response?.status,
		});
	}
);

export default client;
