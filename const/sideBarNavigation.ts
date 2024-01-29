import { NavigationOptions } from 'interfaces';
import AppRoutes from './routes';
import RolesEnum from './role';
import Icons from './icons';

/**
 * This file will hold the possible navigation options for the sidebar
 * like the header const file, initially can be only one const
 * that will be filtered based on user roles/permissions but
 * you can have other const and filter them
 */
const cmsSidebarNavigation: NavigationOptions[] = [
	{
		name: 'dashboard',
		label: 'Dashboard',
		href: AppRoutes.HOME,
		icon: Icons.home,
		iconProps: {
			src: Icons.home,
			fillWhitePath: true,
		},
	},
	{
		name: 'settings',
		label: 'Settings',
		roles: [RolesEnum.ADMIN],
		icon: Icons.gear,
		iconProps: {
			src: Icons.home,
			fillWhitePath: true,
		},
		subOptions: [
			{
				name: 'roles',
				label: 'Roles',
				href: AppRoutes.SETTINGS_ROLES,
			},
			{
				name: 'permissions',
				label: 'Permissions',
				href: AppRoutes.SETTINGS_PERMISSIONS,
			},
			{
				name: 'users',
				label: 'Users',
				href: AppRoutes.SETTINGS_USER,
			},
		],
	},
	{
		name: 'email',
		label: 'Email',
		// roles: [RolesEnum.MODERATOR, RolesEnum.ADMIN],
		icon: Icons.envelope,
		iconProps: {
			src: Icons.home,
			fillWhitePath: true,
		},
		subOptions: [
			{
				name: 'emailEditor',
				label: 'Editor',
				href: AppRoutes.EMAIL_CONTENT_EDITOR,
			},
			{
				name: 'emailTemplates',
				label: 'Templates',
				href: AppRoutes.EMAIL_TEMPLATES_LIST,
			},
		],
	},
	{
		name: 'guide-styles',
		label: 'Guide styles',
		href: '/guide-styles',
		icon: Icons.visible,
		iconProps: {
			src: Icons.home,
			fillWhitePath: true,
		},
		roles: [RolesEnum.USER, RolesEnum.MODERATOR, RolesEnum.ADMIN],
	},

	// THESE ARE FOR TESTING ROLES AND PERMISSIONS
	{
		name: 'misc1',
		label: 'Admin inherit option',
		roles: [RolesEnum.ADMIN],
		subOptions: [
			{
				name: 'submisc1',
				label: 'Admin sub option 1',
				href: '#',
			},
		],
	},
	{
		name: 'misc2',
		label: 'Moderator inherit option',
		roles: [RolesEnum.MODERATOR, RolesEnum.ADMIN],
		subOptions: [
			{
				name: 'submisc2',
				label: 'Moderator sub option 1',
				href: '#',
			},
		],
	},
	{
		name: 'misc3',
		label: 'User inherit option',
		roles: [RolesEnum.USER, RolesEnum.MODERATOR, RolesEnum.ADMIN],
		subOptions: [
			{
				name: 'submisc3',
				label: 'User sub option 1',
				href: '#',
			},
		],
	},
	{
		name: 'misc4',
		label: 'User not inherit option',
		roles: [RolesEnum.USER, RolesEnum.MODERATOR, RolesEnum.ADMIN],
		subOptions: [
			{
				name: 'submisc4User',
				label: 'User sub option',
				href: '#',
				roles: [RolesEnum.USER, RolesEnum.MODERATOR, RolesEnum.ADMIN],
			},
			{
				name: 'submisc4Moderator',
				label: 'Moderator sub option',
				href: '#',
				roles: [RolesEnum.MODERATOR, RolesEnum.ADMIN],
			},
			{
				name: 'submisc4Admin',
				label: 'Admin sub option',
				href: '#',
				roles: [RolesEnum.ADMIN],
			},
		],
	},
];

export default cmsSidebarNavigation;
