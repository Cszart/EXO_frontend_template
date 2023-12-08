import { Redirect } from 'next';
import { Session } from 'next-auth';
import authUtils from 'utils/auth';

interface withAuthorizationServerSideProps {
	session: Session | null;
	allowedPermissions?: string[];
	allowedRoles?: string[];
	redirectTo?: string;
}

/**
 * This component is in charge of managing authorization for SCREENS/Pages
 * but on the server side.
 *
 * This function doesnt use AuthUtils functions since this class will be available only client side
 * We will make the proper evaluations manually in here, const can be accessed tho
 *
 * NOTE: This function should be called inside a getServerSideProps function
 * its made like this intentionally to encapsulate redirect prop to this function and making
 * the developer able to do some other operations inside the getServerSideProp
 *
 * EXAMPLE:
	* export const getServerSideProps: GetServerSideProps = async (context) => {
		const session = await getSession(context);
		const redirect: Redirect | undefined = await withAuthorizationServerSide({
			session: session,
			allowedPermissions: [],
			allowedRoles: [],
			redirectTo: AppRoutes.NOT_FOUND,
		});
		return {
			props: {},
			redirect: redirect,
		};
	};
 * @returns - Redirect prop based on user status
			- Undefined so the return value doesnt have to be evaluated,
			you can just do redirect:redirect so it automatically handles redirection
 */

const withAuthorizationServerSide = async ({
	session,
	allowedPermissions,
	allowedRoles,
	redirectTo,
}: withAuthorizationServerSideProps): Promise<Redirect | undefined> => {
	// If session is null then we should redirect instantly
	if (session == null) {
		console.log('<- [ServerSideAuth], session is null');
		return {
			destination: redirectTo ?? authUtils.getPathToRedirectNotLoggedUser(),
			permanent: false,
		};
	}

	// Check if the user is allowed
	let isAllowedByPermissions = false;
	let isAllowedByRoles = false;

	// If no permissions or roles are given the the user is allowed by default
	if (
		(!allowedPermissions || allowedPermissions.length <= 0) &&
		(!allowedRoles || allowedRoles.length <= 0)
	) {
		console.log('<- [ServerSideAuth], user allowed by default');
		isAllowedByPermissions = true;
		isAllowedByRoles = true;
	}

	// Check if user has any permissions (AuthUtils.hasAnyPermission)
	if (allowedPermissions && allowedPermissions.length > 0) {
		isAllowedByPermissions = session.user.permissions.some((p) =>
			allowedPermissions.includes(p)
		);
	}

	if (allowedRoles && allowedRoles.length > 0) {
		isAllowedByRoles = session.user.permissions.some((p) =>
			allowedRoles.includes(p)
		);
	}

	// Returns null so the server doesnt have to redirect
	if (isAllowedByPermissions || isAllowedByRoles) {
		return undefined;
	}

	// By this time session is not null so it doesnt redirect by default
	// And User is not allowed by neither roles or permissions
	// Return a redirect with default redirection or given one
	return {
		destination: redirectTo ?? authUtils.getPathToRedirectNotLoggedUser(),
		permanent: false,
	};
};

export default withAuthorizationServerSide;
