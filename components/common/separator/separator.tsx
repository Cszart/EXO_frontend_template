import clsx from 'clsx';
import * as React from 'react';

type SeparatorProps = {
	text?: string;
	className?: string;
};

export const Separator: React.FC<SeparatorProps> = ({ text, className }) => {
	return (
		<div className={clsx('relative w-full', className)}>
			<div className="absolute inset-0 flex items-center" aria-hidden="true">
				<div className="w-full border-t border-dark-40" />
			</div>
			<div className="relative flex justify-center">
				<span className="bg-white px-2 text-sm text-dark-100">{text}</span>
			</div>
		</div>
	);
};
