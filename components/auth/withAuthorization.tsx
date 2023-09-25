import { useSession } from 'next-auth/react';
import React from 'react';

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
		// Use a var to automatically update the value
		let isAllowed = false;

		// Auth logic
		const session = useSession();
		console.log('<- SESSION : ', session);

		// If allowedRoles is provided, check if the user has any of the allowed roles
		// if (allowedRoles && allowedRoles.length > 0) {
		// 	const userHasRole = allowedRoles.includes(userRole);
		// 	if (!userHasRole) {
		// 		return <p>You are not authorized to access this page.</p>;
		// 	}
		// }

		// // If allowedPermissions is provided, check if the user has any of the allowed permissions
		// if (allowedPermissions && allowedPermissions.length > 0) {
		// 	const userHasPermission = userPermissions.some((permission) =>
		// 		allowedPermissions.includes(permission)
		// 	);
		// 	if (!userHasPermission) {
		// 		return <p>You are not authorized to access this page.</p>;
		// 	}
		// }

		// If the user is authorized, render the wrapped component
		return <WrappedComponent />;
	};

	return AuthWrapper;
};

export default withAuthorization;
