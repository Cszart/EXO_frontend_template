import { Navigation } from 'interfaces';

const sidebarNavigation: Navigation[] = [
	{
		name: 'dashboard',
		label: 'Dashboard',
		href: '/',
	},
	{
		name: 'settings',
		label: 'Settings',
		href: '/settings',
		children: [
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

export default sidebarNavigation;
