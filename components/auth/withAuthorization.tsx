import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import authUtils from 'utils/auth';

interface WithAuthorizationProps {
	allowedPermissions?: string[];
	allowedRoles?: string[];
	redirectTo?: string;
}

const withAuthorization = (
	WrappedComponent: React.ComponentType,
	allowedPermissions?: string[],
	allowedRoles?: string[],
	redirectTo?: string
): React.FC<WithAuthorizationProps> => {
	const AuthWrapper: React.FC<WithAuthorizationProps> = () => {
		const router = useRouter();

		// Auth logic
		const session = useSession();
		authUtils.setSession(session);

		// Set the permissions and roles var
		let isAllowed = false;

		if (!allowedPermissions && !allowedRoles) isAllowed = true;
		if (allowedPermissions)
			isAllowed = isAllowed || authUtils.hasAnyPermission(allowedPermissions);
		if (allowedRoles)
			isAllowed = isAllowed || authUtils.hasAnyRole(allowedRoles);

		// If the user is authorized, render the wrapped component
		if (isAllowed) {
			return <WrappedComponent />;
		} else {
			if (redirectTo) {
				router.push(redirectTo);
			} else {
				router.push(authUtils.getPathToNotAuthorized());
			}
		}
		return <></>;
	};

	return AuthWrapper;
};

export default withAuthorization;
