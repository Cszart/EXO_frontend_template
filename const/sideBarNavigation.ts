import { NavigationOptions } from 'interfaces';
import AppRoutes from './routes';
import RolesEnum from './role';
import Icons from './icons';

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
				href: AppRoutes.SETTINGS_PERMISSIONS,
			},
			{
				name: 'permissions',
				label: 'Permissions',
				href: AppRoutes.SETTINGS_ROLES,
			},
		],
	},
	{
		name: 'email',
		label: 'Email',
		roles: [RolesEnum.MODERATOR, RolesEnum.ADMIN],
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
];

export default cmsSidebarNavigation;
