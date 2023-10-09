import PermissionsEnum from 'const/permissions';
import RolesEnum from 'const/role';
import { UserType } from 'interfaces';

const DummyUsersData: UserType[] = [
	{
		id: '1',
		email: 'john.doe@example.com',
		username: 'johndoe',
		name: 'John Doe',
		image: 'https://example.com/images/johndoe.jpg',
		roles: [RolesEnum.ADMIN],
		permissions: [
			PermissionsEnum.USER_MANAGEMENT_VIEW,
			PermissionsEnum.ROLE_MANAGEMENT_VIEW,
			PermissionsEnum.PERMISSION_MANAGEMENT_VIEW,
		],
	},
	{
		id: '2',
		email: 'jane.smith@example.com',
		username: 'janesmith',
		name: 'Jane Smith',
		image: 'https://example.com/images/janesmith.jpg',
		roles: [RolesEnum.MODERATOR],
		permissions: [
			PermissionsEnum.USER_MANAGEMENT_VIEW,
			PermissionsEnum.ROLE_MANAGEMENT_VIEW,
		],
	},
	{
		id: '3',
		email: 'alex.johnson@example.com',
		username: 'alexjohnson',
		name: 'Alex Johnson',
		image: 'https://example.com/images/alexjohnson.jpg',
		roles: [RolesEnum.USER],
		permissions: [PermissionsEnum.USER_MANAGEMENT_VIEW],
	},
	{
		id: '4',
		email: 'sarah.wilson@example.com',
		username: 'sarahwilson',
		name: 'Sarah Wilson',
		image: 'https://example.com/images/sarahwilson.jpg',
		roles: [RolesEnum.USER],
		permissions: [PermissionsEnum.USER_MANAGEMENT_VIEW],
	},
	{
		id: '5',
		email: 'michael.brown@example.com',
		username: 'michaelbrown',
		name: 'Michael Brown',
		image: 'https://example.com/images/michaelbrown.jpg',
		roles: [RolesEnum.USER],
		permissions: [PermissionsEnum.USER_MANAGEMENT_VIEW],
	},
	{
		id: '6',
		email: 'emily.jones@example.com',
		username: 'emilyjones',
		name: 'Emily Jones',
		image: 'https://example.com/images/emilyjones.jpg',
		roles: [RolesEnum.USER],
		permissions: [PermissionsEnum.USER_MANAGEMENT_VIEW],
	},
];

export default DummyUsersData;
