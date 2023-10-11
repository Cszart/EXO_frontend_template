import { NavigationOptions } from 'interfaces';

const cmsSidebarNavigation: NavigationOptions[] = [
	{
		name: 'dashboard',
		label: 'Dashboard',
		href: '/',
	},
	{
		name: 'settings',
		label: 'Settings',
		href: '/settings',
		subOptions: [
			{
				name: 'roles',
				label: 'Roles',
				href: '/settings/roles',
			},
			{
				name: 'permissions',
				label: 'Permissions',
				href: '/settings/permissions',
			},
		],
	},
];

export default cmsSidebarNavigation;
