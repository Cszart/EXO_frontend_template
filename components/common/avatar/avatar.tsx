import clsx from 'clsx';
import { Icons } from 'const';
import * as React from 'react';

type AvatarProps = {
	photoUrl: string;
	size: 'small' | 'medium' | 'large';
	width?: string;
	className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({
	photoUrl,
	size,
	width,
	className,
}) => {
	return (
		<div
			className={clsx(
				'rounded-full ring-2 ring-white',
				{ 'w-8 h-8': size === 'small' },
				{ 'w-12 h-12': size === 'medium' },
				{ 'w-16 h-16': size === 'large' },
				width,
				className
			)}
		>
			<img
				src={photoUrl || Icons.avatar}
				alt="avatar"
				className="object-cover w-full h-full rounded-full bg-dark-10"
			/>
		</div>
	);
};
