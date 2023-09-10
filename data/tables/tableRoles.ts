export const roles = [
	{
		name: 'superAdmin',
		description:
			'The Super Admin has the highest level of administrative privileges and access within a system or application.',
		create: 'true',
		edit: 'true',
		view: 'true',
		delete: 'true',
	},
	{
		name: 'admin',
		description:
			'An Admin is a user with elevated privileges and responsibilities.',
		create: 'false',
		edit: 'true',
		view: 'true',
		delete: 'false',
	},
	{
		name: 'user',
		description:
			'A User is a regular individual who utilizes the system or application.',
		create: 'false',
		edit: 'false',
		view: 'true',
		delete: 'false',
	},
];
