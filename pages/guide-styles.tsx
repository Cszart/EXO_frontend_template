import { Avatar, Separator } from 'components/common';
import InputPassword, {
	Button,
	InputEmail,
	InputText,
	Typography,
} from 'components/form';
import { Layout } from 'components/layout';
import { Icons } from 'const';
import * as React from 'react';
import { useForm } from 'react-hook-form';

const GuideStyles = (): JSX.Element => {
	const { register } = useForm({ mode: 'onChange' });
	return (
		<Layout withFooter withHeader withSidebar>
			<div className="flex flex-col items-start justify-center gap-20 w-full px-10 py-14">
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
				<div className="flex flex-wrap space-x-10 w-full">
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

				{/* Button decoration */}
				<div className="flex flex-wrap space-x-10 w-full">
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

				{/* Button size */}
				<div className="flex flex-col space-y-10 w-full">
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

				<Separator text="Avatars" />
				{/* Avatar */}
				<div className="flex flex-wrap space-x-10 w-full">
					<Avatar photoUrl={Icons.avatar} size="large" />
					<Avatar photoUrl={Icons.avatar} size="medium" />
					<Avatar photoUrl={Icons.avatar} size="small" />
					<Avatar photoUrl={Icons.avatar} className="w-20 h-20" />
				</div>

				<Separator text="Inputs" />

				<div className="flex flex-wrap space-x-10 w-full">
					<InputText
						register={register}
						name="Name"
						title="Name"
						customPlaceholder="Name"
					/>
					<InputEmail name="Email" register={register} title="Email" />
					<InputPassword name="Password" register={register} title="Password" />
				</div>
			</div>
		</Layout>
	);
};

export default GuideStyles;
