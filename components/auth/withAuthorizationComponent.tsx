import { useSession } from 'next-auth/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import authUtils from 'utils/auth';

interface WithAuthorizationComponentProps {
	allowedPermissions?: string[];
	allowedRoles?: string[];
}

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
