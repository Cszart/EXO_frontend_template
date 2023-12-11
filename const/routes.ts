// Keep track of the application available routes so there's no need to
// hand type every route.push()

enum AppRoutes {
	// Basic
	HOME = '/',
	GUIDE_STYLES = '/guide-styles',
	NOT_AUTHORIZED = '/not_authorized',
	NOT_FOUND = '/not_found',

	// Auth routes
	AUTH_FORGOT_PASSWORD = '/auth/forgot-password',
	AUTH_SIGN_IN = '/auth/signin',
	AUTH_SIGN_UP = '/auth/signup',

	// Email related
	EMAIL_CONTENT_EDITOR = '/email/contentEditor',
	EMAIL_TEMPLATES_LIST = '/email/templatesList',

	// Settings / Management
	SETTINGS_PERMISSIONS = '/settings/permissions',
	SETTINGS_ROLES = '/settings/roles',
}

export default AppRoutes;
