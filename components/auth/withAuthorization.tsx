import SessionStatus from 'const/session';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import authUtils from 'utils/auth';

interface WithAuthorizationProps {
	allowedPermissions?: string[];
	allowedRoles?: string[];
	redirectTo?: string;
}

/**
 * This component is in charge of managing authorization for SCREENS/Pages
 * it uses the AuthUtils to handle whether the user has the required roles/permissions
 * to see the page if not then redirect the user to the right screen or the given one
 *
 * @param WrappedComponent The component to be rendered
 * @param allowedPermissions The permissions that the user should meet to see the WrappedComponent
 * @param allowedRoles The roles that the user should have to see the component
 * @param redirectTo if the user has no permissions/role redirect to this url
 *
 * @returns The wrapped component or nothing (should redirect)
 */
const withAuthorization = (
	WrappedComponent: React.ComponentType,
	allowedPermissions?: string[],
	allowedRoles?: string[],
	redirectTo?: string
): React.FC<WithAuthorizationProps> => {
	const AuthWrapper: React.FC<WithAuthorizationProps> = () => {
		const router = useRouter();
		const session = useSession();
		authUtils.setSession(session);

		// Set the permissions and roles
		const [isAllowed, setIsAllowed] = useState<boolean>(false);

		useEffect(() => {
			let isAllowedByPermissions = false;
			let isAllowedByRoles = false;

			// If no permissions or roles are given the the user is allowed by default
			// this should not be the case because if this HOC is being used is to ensure
			// the user has some roles or permissions
			if (!allowedPermissions && !allowedRoles) {
				isAllowedByPermissions = true;
				isAllowedByRoles = true;
				setIsAllowed(true);
			}

			// Use AuthUtils to check for user permissions or roles
			if (session.status == SessionStatus.AUTHENTICATED) {
				if (allowedPermissions) {
					isAllowedByPermissions =
						authUtils.hasAnyPermission(allowedPermissions);
				}

				if (allowedRoles) {
					isAllowedByRoles = authUtils.hasAnyRole(allowedRoles);
				}

				setIsAllowed(isAllowedByPermissions || isAllowedByRoles);
			} else if (
				session.status == SessionStatus.UNAUTHENTICATED &&
				!isAllowedByPermissions &&
				!isAllowedByRoles &&
				!isAllowed
			) {
				if (redirectTo) {
					router.push(redirectTo);
				} else {
					router.push(authUtils.getPathToNotAuthorized());
				}
			}

			console.log('\n\n\n <- auth HOC  : ', {
				session,
				session_auth: authUtils.getSession(),
				isAllowedByPermissions,
				isAllowedByRoles,
			});
		}, [isAllowed, router, session, session.status]);

		// If the user is authorized, render the wrapped component
		if (isAllowed) {
			return <WrappedComponent />;
		} else {
			return <></>;
		}
	};

	return AuthWrapper;
};

export default withAuthorization;
