import PermissionsEnum from 'const/permissions';
import RolesEnum from 'const/role';
import AppRoutes from 'const/routes';
import SessionStatus from 'const/session';
import { UserType } from 'interfaces';
import { SessionContextValue } from 'next-auth/react';

// --- --- Constants to redirect the user

// If the user is not logged already, it will be redirected to this path
const PATH_TO_REDIRECT_NOT_LOGGED_USER = AppRoutes.AUTH_SIGN_IN;

// If the user is logged already, it will be redirected to this path
const PATH_TO_REDIRECT_LOGGED_USER = AppRoutes.HOME;

// If the user is not authorized, it will be redirected to this path
const PATH_TO_NOT_AUTHORIZED = AppRoutes.NOT_AUTHORIZED;

// Paths that will be public, not log in necessary
const PUBLIC_PATHS = [
	AppRoutes.AUTH_FORGOT_PASSWORD,
	AppRoutes.AUTH_SIGN_IN,
	AppRoutes.AUTH_SIGN_UP,
	AppRoutes.NOT_AUTHORIZED,
	AppRoutes.NOT_FOUND,
];

// Errors that can occur related to login or session
export enum LoginError {
	NOT_AUTHORIZED,
	TOKEN_EXPIRED,
}

/**
 * Utility class for authentication-related operations
 *
 * This class should be used client-side
 */
class AuthUtils {
	//  Session instance
	private session: SessionContextValue | null = null;

	constructor(
		private publicPaths: Set<string> = new Set<string>(),
		private pathToRedirectNotLoggedUser: string = PATH_TO_REDIRECT_NOT_LOGGED_USER,
		private pathToRedirectLoggedUser: string = PATH_TO_REDIRECT_LOGGED_USER,
		private pathToNotAuthorized: string = PATH_TO_NOT_AUTHORIZED
	) {
		PUBLIC_PATHS.forEach((path) => !!path && this.publicPaths.add(path));
	}

	// -- Session -- //
	// Before using any of the utils functions session should be SET
	// The layout component will be in charge of setting this value, but devs should keep track if this fails for some reason
	public setSession(session: SessionContextValue | null): void {
		this.session = session;
	}

	public getSession(): SessionContextValue | null {
		return this.session;
	}

	// In case session is not set then an error message should be throw
	protected checkSession(): boolean {
		if (!this.session) {
			throw new Error(
				'Session is null. Please set the session before calling this method.'
			);
		}

		return true;
	}

	protected isAuthenticatedSession(): boolean {
		return this.session?.status == SessionStatus.AUTHENTICATED;
	}

	// -- Getters -- //
	public getPublicPaths(): Set<string> {
		return this.publicPaths;
	}
	public getPathToRedirectNotLoggedUser(): string {
		return this.pathToRedirectNotLoggedUser;
	}
	public getPathToNotAuthorized(): string {
		return this.pathToNotAuthorized;
	}

	// --- --- Util functions --- --- //

	// Get session user, devs might follow manual useSession approach without any problem
	public getUser(): UserType | null {
		this.checkSession();
		if (this.isAuthenticatedSession() && this.session && this.session.data)
			return this.session.data.user;
		return null;
	}

	// Get the user Roles
	public getUserRoles(): RolesEnum[] {
		const user = this.getUser();
		if (user) return user.roles;
		return [];
	}

	// Get the user permissions
	public getUserPermissions(): PermissionsEnum[] {
		const user = this.getUser();
		if (user) return user.permissions;
		return [];
	}

	// Check if user has an specific role
	public hasRole(roleName: string): boolean {
		const user: UserType | null = this.getUser();

		if (user) return user.roles.some((role) => role === roleName);
		return false;
	}

	// Check if user has a set of roles
	public hasAnyRole(roleNames: string[]): boolean {
		const user: UserType | null = this.getUser();
		if (user) return user.roles?.some((role) => roleNames.includes(role));
		return false;
	}

	// Check if user has a specific permission
	public hasPermissionFor(permission: string): boolean {
		const user: UserType | null = this.getUser();

		if (user) return user.permissions.some((p) => p == permission);
		return false;
	}

	// Check if user has any of the permission provided
	public hasAnyPermission(permissions: string[]): boolean {
		const user: UserType | null = this.getUser();
		if (user) {
			return user.permissions.some((p) => permissions.includes(p));
		}

		return false;
	}

	// If the user is allowed to do a certain action based on his permissions
	// then this method allows it or decline it
	public ifAllowed<T>(
		permissionUUIDs: string[],
		ifTrue: T,
		ifFalse?: T
	): T | undefined {
		if (this.hasAnyPermission(permissionUUIDs)) return ifTrue;
		return ifFalse;
	}

	// Check if the user session is still on
	public isLogged(): boolean {
		this.checkSession();

		if (this.session && this.session.data) {
			const expirationDate = new Date(this.session?.data?.expires);
			const currentDate = new Date();
			return currentDate < expirationDate;
		}
		return false;
	}

	// Redirects the user based on its state on the app
	public redirectUserIfNeeded(): void {
		// Here we dont want to throw an error if the user is not logged
		// or if the session is null, we want to redirect instead so
		// this is why we dont re-use the above functions
		if (typeof window === 'undefined') {
			console.log('<- Auth utils, window is undefined : ');
			return;
		}

		const isSessionActive =
			this.session != null && this.session != undefined ? true : false;
		let isSessionExpired = false;

		if (this.session && this.session.data) {
			const expirationDate = new Date(this.session.data.expires);
			const currentDate = new Date();
			isSessionExpired = currentDate > expirationDate;
		}

		// If there is no session: the user is NOT LOGGED IN
		// but if the user is trying to access a page that is not public then redirect
		if (!isSessionActive && !this.publicPaths.has(window.location.pathname)) {
			window.location.href = this.pathToRedirectNotLoggedUser;
			return;
		}

		// If there is a session and the token has expired: the user is NOT LOGGED IN
		// and is not on a public page
		if (
			isSessionActive &&
			isSessionExpired &&
			!this.publicPaths.has(window.location.pathname)
		) {
			window.location.href = this.pathToRedirectNotLoggedUser;
			return;
		}

		// If there is a session and the token is not expired the user is LOGGED IN
		// but the user is looking the auth pages, redirect him (or her)
		const authPaths = new Set<string>([
			AppRoutes.AUTH_FORGOT_PASSWORD,
			AppRoutes.AUTH_SIGN_IN,
			AppRoutes.AUTH_SIGN_UP,
		]);
		if (
			isSessionActive &&
			!isSessionExpired &&
			authPaths.has(window.location.pathname)
		) {
			window.location.href = this.pathToRedirectLoggedUser;
			return;
		}

		// If there is no session then redirect
		// this is last resort, probably the other if are going to be called
		if (!isSessionActive) {
			window.location.href = this.pathToRedirectNotLoggedUser;
			return;
		}
	}
}

const authUtils = new AuthUtils();
export default authUtils;
