import { Typography } from 'components/form/typography';
import * as React from 'react';

const GuideStyles = () => {
	return (
		<div className="flex flex-col items-start justify-center gap-20 w-full px-10 py-14">
			<Typography
				type="custom-h1"
				className="text-3xl font-bold text-gray-900 text-center"
			>
				Guide Styles
			</Typography>

			<div className="flex flex-col gap-10 w-full">
				<Typography type="headline-2">Typography</Typography>
				<Typography type="headline-2">headline-2</Typography>
				<Typography type="headline-3">headline-3</Typography>
				<Typography type="headline-4">headline-4</Typography>
				<Typography type="headline-5">headline-5</Typography>
				<Typography type="subtitle-1">subtitle-1</Typography>
				<Typography type="subtitle-2">subtitle-2</Typography>
				<Typography type="subtitle-3">subtitle-3</Typography>
				<Typography type="link-1">link-1</Typography>
				<Typography type="link-2">link-2</Typography>
				<Typography type="body-1">body-1</Typography>
				<Typography type="body-2">body-2</Typography>
				<Typography type="caption-1">caption-1</Typography>
				<Typography type="caption-2">caption-2</Typography>
				<Typography type="caption-3">caption-3</Typography>
				<Typography type="overline">overline</Typography>
			</div>
		</div>
	);
};

export default GuideStyles;
