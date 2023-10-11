import { NavigationOptions } from 'interfaces';

// Options to show on the user profile menu in the navbar header
export const headerUserProfileOptions: NavigationOptions[] = [];

// Normal navbar options, normally just text
// Updated headerNavbarOptions
export const headerNavbarOptions: NavigationOptions[] = [
	{
		name: 'home',
		label: 'Home',
		href: '#',
	},
	{
		name: 'about',
		label: 'About',
		href: '#',
	},
	{
		name: 'section',
		label: 'Section',
		subOptions: [
			{
				name: 'section1',
				label: 'Section 1',
				href: '#',
			},
			{
				name: 'section2',
				label: 'Section 2',
				href: '#',
			},
		],
	},
	{
		name: 'click',
		label: 'Click',
		onClick: () => {
			alert('Header click action');
		},
	},
];
