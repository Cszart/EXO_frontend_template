import { Option } from 'interfaces';
import { signOut } from 'next-auth/react';
import AppRoutes from 'const/routes';

/**
 * This function is meant to handle the options to be shown under the
 * user profile in the header
 * It appends the options to the baseOptions and returns the updated array.
 *
 * @param baseOptions The base options to which the new options will be appended
 * @param sessionStatus The session status to determine the options to add
 * @returns A new array of options
 */
export function buildHeaderUserProfileOptions(
	baseOptions: Option[],
	sessionStatus: string
): Option[] {
	if (sessionStatus === 'authenticated') {
		return baseOptions.concat([
			{
				name: 'signout',
				label: 'Sign Out',
				onClick: async () => await signOut({ callbackUrl: '/' }),
			},
		]);
	} else if (sessionStatus === 'unauthenticated') {
		return baseOptions.concat([
			{
				name: 'signin',
				label: 'Sign In',
				href: AppRoutes.AUTH_SIGN_IN,
			},
		]);
	}

	return baseOptions;
}

// Other builders/handlers can be added here with extra logic
