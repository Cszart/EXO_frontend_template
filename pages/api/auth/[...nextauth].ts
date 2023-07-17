import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

const options: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		FacebookProvider({
			clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
			clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET || '',
			profile: (data) => ({
				provider: 'facebook',
				...data,
			}),
		}),
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
			profile: (data) => ({
				provider: 'google',
				...data,
			}),
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

				const res = await fetch('/your/endpoint', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { 'Content-Type': 'application/json' },
				});

				const user = await res.json();

				// If no error and we have user data, return it
				if (res.ok && user) {
					return user;
				}

				// If no error and we have user data, return it
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	pages: {
		signIn: '/',
		signOut: '/auth/signout',
		error: '/auth/error', // Error code passed in query string as ?error=
		verifyRequest: '/auth/verify-request', // (used for check email message)
		newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
	},
	callbacks: {
		async signIn() {
			const isAllowedToSignIn = true;
			if (isAllowedToSignIn) {
				return true;
			} else {
				// Return false to display a default error message
				return false;
				// Or you can return a URL to redirect to:
				// return '/unauthorized'
			}
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			// session.accessToken = token.accessToken // Pending
			session.user = token;

			return session;
		},
		async jwt({ token, account, profile }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
				token.id = profile; // Pending token.id = profile?.id
			}
			return token;
		},
	},
	// A database is optional, but required to persist accounts in a database
	// database: process.env.DATABASE_URL,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
