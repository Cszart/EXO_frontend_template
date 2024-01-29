import * as React from 'react';
import { Typography } from '../typography';
import Image from 'next/image';
import Icons from 'const/icons';

export const EmptyState = (): JSX.Element => {
	return (
		<div className="flex flex-col w-full mt-20 justify-center items-center md:m-5">
			<Image src={Icons.nodata} width={100} height={120} alt="empty state" />
			<Typography type="headline-3" className="font-bold mt-4">
				No results found
			</Typography>
			<Typography type="body-1" className="mt-3">
				Sorry, there are not results for this page
			</Typography>
		</div>
	);
};
