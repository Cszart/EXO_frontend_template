import { Typography, Separator, Button, Avatar } from 'components/common';
import { Dropdown } from 'components/common/dropdown';
import Spinner from 'components/common/spinner/spinner';
import PaginatedTable from 'components/common/tables/paginatedTable';
import SimpleTable from 'components/common/tables/simpleTable';
import { InputText, InputEmail } from 'components/form';
import InputPassword from 'components/form/input-password/input-password';
import { Layout } from 'components/layout';
import Icons from 'const/icons';
import DummyUsersData from 'data/tables/userDummyData';
import { UserType } from 'interfaces';
import { useForm } from 'react-hook-form';

const GuideStyles = (): JSX.Element => {
	const { register } = useForm({ mode: 'onChange' });
	return (
		<Layout withFooter withHeader withSidebar>
			<div className="flex flex-col items-start justify-center gap-20 w-full py-14">
				<Typography
					type="custom-h1"
					className="text-3xl font-bold text-gray-900 text-center"
				>
					Guide Styles
				</Typography>

				{/* *** Typography *** */}
				<Separator text="Typography" />
				<div className="flex flex-wrap space-x-10 w-full">
					<div className="space-y-10">
						<Typography type="headline-2">headline-2</Typography>
						<Typography type="headline-3">headline-3</Typography>
						<Typography type="headline-4">headline-4</Typography>
						<Typography type="headline-5">headline-5</Typography>
					</div>
					<div className="space-y-10">
						<Typography type="subtitle-1">subtitle-1</Typography>
						<Typography type="subtitle-2">subtitle-2</Typography>
						<Typography type="subtitle-3">subtitle-3</Typography>
					</div>
					<div className="space-y-10">
						<Typography type="link-1">link-1</Typography>
						<Typography type="link-2">link-2</Typography>
					</div>
					<div className="space-y-10">
						<Typography type="body-1">body-1</Typography>
						<Typography type="body-2">body-2</Typography>
					</div>
					<div className="space-y-10">
						<Typography type="caption-1">caption-1</Typography>
						<Typography type="caption-2">caption-2</Typography>
						<Typography type="caption-3">caption-3</Typography>
					</div>
					<Typography type="overline">overline</Typography>
				</div>

				<Separator text="Buttons" />

				{/* Button decoration */}
				<div className="flex flex-wrap justify-between gap-4 w-full">
					<Button decoration="fill" size="medium">
						Button fill
					</Button>
					<Button decoration="line-primary" size="medium">
						Button line-primary
					</Button>
					<Button decoration="line-white" size="medium">
						Button line-white
					</Button>
				</div>

				<Separator text="Disabled" className="max-w-[200px] self-center" />
				{/* Button disabled */}
				<div className="flex flex-wrap justify-between gap-4 w-full">
					<Button decoration="fill" size="medium" disabled>
						Button fill disabled
					</Button>
					<Button decoration="line-primary" size="medium" disabled>
						Button line-primary disabled
					</Button>
					<Button decoration="line-white" size="medium" disabled>
						Button line-white disabled
					</Button>
				</div>

				<Separator text="Size" className="max-w-[200px] self-center" />
				{/* Button size */}
				<div className="flex flex-wrap justify-between gap-4 w-full">
					<Button decoration="fill" size="fit">
						Button fit
					</Button>
					<Button decoration="fill" size="extra-small">
						Button extra
					</Button>
					<Button decoration="fill" size="small">
						Button small
					</Button>
					<Button decoration="fill" size="medium">
						Button medium
					</Button>
					<Button decoration="fill" size="large">
						Button large
					</Button>
					<Button decoration="fill" size="full">
						Button full
					</Button>
				</div>

				<Separator text="Dropdown" className="max-w-[200px] self-center" />
				{/* Button dropdown */}
				<div className="flex flex-wrap justify-between gap-4 w-full">
					<Dropdown
						buttonContent="This is a dropdown button"
						showChevronDownIcon
						items={[
							{
								name: 'item1',
								label: 'Item 1',
								onClick: () => alert('This is item 1'),
							},
							{
								name: 'item2',
								label: 'Item 2',
								onClick: () => alert('This is item 2'),
							},
							{
								name: 'item3',
								label: 'Item 3',
								onClick: () => alert('This is item 3'),
							},
						]}
					/>
				</div>

				<Separator text="Avatars" />
				{/* Avatar */}
				<div className="flex flex-wrap justify-betwen gap-10 w-full">
					<Avatar photoUrl={Icons.avatar} size="small" />
					<Avatar photoUrl={Icons.avatar} size="medium" />
					<Avatar photoUrl={Icons.avatar} size="large" />
					<Avatar photoUrl={Icons.avatar} className="w-20 h-20" />
				</div>

				{/* Inputs */}
				<Separator text="Inputs" />
				<div className="flex flex-col gap-10 w-full">
					<InputText
						register={register}
						name="Name"
						title="Name"
						customPlaceholder="Name"
					/>

					<InputEmail name="Email" register={register} title="Email" />

					<InputPassword name="Password" register={register} title="Password" />
				</div>

				{/* Spinner and misc */}
				<Separator text="MISC" />
				<div className="flex flex-col gap-2 justify-center align-center w-auto">
					<Typography type="caption-1" text="Spinner" />
					<Spinner width="w-8" circleFill="grey" loadingBarFill="black" />
				</div>

				{/* Tables */}
				<Separator text="Tables" />
				<div className="flex flex-col gap-2 justify-center align-center w-full h-auto">
					<Typography type="headline-4" text="Simple Table" />
					<Typography type="caption-3" text="Static array" />
					<SimpleTable<UserType>
						columns={[
							{
								header: 'ID',
								content: (instance) => <>{instance.id}</>,
							},
							{
								header: 'Email',
								content: (instance) => <>{instance.email}</>,
							},
							{
								header: 'Username',
								content: (instance) => <>{instance.username}</>,
							},
							{
								header: 'Name',
								content: (instance) => <>{instance.name}</>,
							},
							{
								header: 'Roles',
								content: (instance) => <>{instance.roles.join(', ')}</>,
							},
							{
								header: 'Permissions',
								content: (instance) => <>{instance.permissions.join(', ')}</>,
							},
						]}
						rows={DummyUsersData}
						rowActions={(instance: UserType) => {
							return [
								{
									label: 'Action 1',
									onClick: () =>
										alert(`This Action 1 for user ${instance.name}`),
								},
								{
									label: 'Action 2',
									onClick: () =>
										alert(`This Action 2 for user ${instance.email}`),
								},
								{
									label: 'Action 3',
									onClick: () =>
										alert(`This Action 3 for user ${instance.username}`),
								},
							];
						}}
					/>
				</div>

				<div className="flex flex-col gap-2 justify-center align-center w-full h-auto">
					<Typography type="headline-4" text="Paginated Table" />
					<Typography type="caption-3" text="Static array" />
					<PaginatedTable<UserType>
						page={1}
						pageSize={DummyUsersData.length}
						columns={[
							{
								header: 'ID',
								content: (instance) => <>{instance.id}</>,
							},
							{
								header: 'Email',
								content: (instance) => <>{instance.email}</>,
							},
							{
								header: 'Username',
								content: (instance) => <>{instance.username}</>,
							},
							{
								header: 'Name',
								content: (instance) => <>{instance.name}</>,
							},
							{
								header: 'Roles',
								content: (instance) => <>{instance.roles.join(', ')}</>,
							},
							{
								header: 'Permissions',
								content: (instance) => <>{instance.permissions.join(', ')}</>,
							},
						]}
						rows={DummyUsersData}
						rowActions={(instance: UserType) => {
							return [
								{
									label: 'Action 1',
									onClick: () =>
										alert(`This Action 1 for user ${instance.name}`),
								},
								{
									label: 'Action 2',
									onClick: () =>
										alert(`This Action 2 for user ${instance.email}`),
								},
								{
									label: 'Action 3',
									onClick: () =>
										alert(`This Action 3 for user ${instance.username}`),
								},
							];
						}}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default GuideStyles;
