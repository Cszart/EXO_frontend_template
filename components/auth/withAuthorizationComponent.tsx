import { useSession } from 'next-auth/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import authUtils from 'utils/auth';

interface WithAuthorizationComponentProps {
	allowedPermissions?: string[];
	allowedRoles?: string[];
}

/**
 * This Auth is meant to be used component level, the difference
 * between withAuthorization is that this renders its children when the user has permissions
 * or render none (it doesnt redirects)
 *
 * @param allowedPermissions The permissions array to compare against (the permissions that can see this)
 * @param allowedRoles The roles array to compare against (the roles that can see this)
 * @param children The component to render
 * @returns a JSX element, depending if the user has or not permissions to see this component
 */
const WithAuthorizationComponent: React.FC<
	PropsWithChildren<WithAuthorizationComponentProps>
> = ({ allowedPermissions, allowedRoles, children }) => {
	const session = useSession();
	authUtils.setSession(session);

	const [isAllowed, setIsAllowed] = useState<boolean>(false);

	useEffect(() => {
		// Check if the user has the required permissions or roles
		let isAllowedByPermissions = false;
		let isAllowedByRoles = false;

		// Default is allowed when no permissions/roles
		if (!allowedPermissions && !allowedRoles) {
			isAllowedByPermissions = true;
			isAllowedByRoles = true;
			setIsAllowed(true);
		}

		if (allowedPermissions) {
			isAllowedByPermissions = authUtils.hasAnyPermission(allowedPermissions);
		}

		if (allowedRoles) {
			isAllowedByRoles = authUtils.hasAnyRole(allowedRoles);
		}

		setIsAllowed(isAllowedByPermissions || isAllowedByRoles);
	}, [allowedPermissions, allowedRoles]);

	if (isAllowed) {
		return <>{children}</>;
	} else {
		return <></>;
	}
};

export default WithAuthorizationComponent;
