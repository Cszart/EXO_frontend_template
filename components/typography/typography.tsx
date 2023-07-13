import * as React from 'react';
import clsx from 'clsx';

export interface TypographyProps {
	// Custom tags
	type:
		| 'custom-p'
		| 'custom-h1'
		| 'custom-h2'
		| 'custom-h3'
		| 'custom-h4'

		// Figma styles (Adapt to your own styles)
		| 'headline-2'
		| 'headline-3'
		| 'headline-4'
		| 'headline-5'
		| 'subtitle-1'
		| 'subtitle-2'
		| 'subtitle-3'
		| 'link-1'
		| 'link-2'
		| 'body-1'
		| 'body-2'
		| 'caption-1'
		| 'caption-2'
		| 'caption-3'
		| 'overline';

	text?: string;
	className?: string;
	children?: React.ReactNode;
	onClick?: (data?: any) => void;
}

export const Typography: React.FC<TypographyProps> = ({
	type,
	text = '',
	className = '',
	children,
	onClick,
}) => {
	//              //
	//              //
	// Custom Tags  //
	if (type === 'custom-p')
		return (
			<p className={clsx(className)} onClick={() => onClick && onClick()}>
				{children || text}
			</p>
		);
	if (type === 'custom-h1')
		return (
			<h1 className={clsx(className)} onClick={() => onClick && onClick()}>
				{children || text}
			</h1>
		);
	if (type === 'custom-h2')
		return (
			<h2 className={clsx(className)} onClick={() => onClick && onClick()}>
				{children || text}
			</h2>
		);
	if (type === 'custom-h3')
		return (
			<h3 className={clsx(className)} onClick={() => onClick && onClick()}>
				{children || text}
			</h3>
		);
	if (type === 'custom-h4')
		return (
			<h4 className={clsx(className)} onClick={() => onClick && onClick()}>
				{children || text}
			</h4>
		);

	/////////////////////////
	//                    //
	// Figma Text Styles  //

	if (type === 'headline-2')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-bold text-3xl',
					'xl:text-4xl',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'headline-3')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-bold text-2xl',
					'xl:text-3xl',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'headline-4')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-bold text-[21px]',
					'xl:text-2xl leading-[30px]',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'headline-5')
		return (
			<h5
				className={clsx(
					'text-gray-800 font-bold text-lg',
					'xl:text-[21px] xl:leading-[26px]',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h5>
		);

	if (type === 'subtitle-1')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-medium text-base xl:text-lg',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'subtitle-2')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-medium text-sm xl:text-base',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'subtitle-3')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-bold text-sm xl:text-base leading-5',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'link-1')
		return (
			<h1
				className={clsx('text-gray-800 font-bold text-sm', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'link-2')
		return (
			<h1
				className={clsx('text-gray-800 font-bold text-xs', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'body-1')
		return (
			<h1
				className={clsx('text-gray-800 font-normal text-base', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'body-2')
		return (
			<h1
				className={clsx('text-gray-800 font-normal text-xs', className)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'caption-1')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-light text-[10px] leading-[14px]',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'caption-2')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-medium text-[10px] leading-[14px]',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'caption-3')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-extrabold text-[10px] leading-[14px]',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	if (type === 'overline')
		return (
			<h1
				className={clsx(
					'text-gray-800 font-medium text-[8px] leading-[10px]',
					className
				)}
				onClick={() => onClick && onClick()}
			>
				{children || text}
			</h1>
		);

	return null;
};
