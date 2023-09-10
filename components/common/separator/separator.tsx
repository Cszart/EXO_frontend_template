import * as React from 'react';

type SeparatorProps = {
	text?: string;
};

export const Separator: React.FC<SeparatorProps> = ({ text }) => {
	return (
		<div className="relative w-full">
			<div className="absolute inset-0 flex items-center" aria-hidden="true">
				<div className="w-full border-t border-dark-40" />
			</div>
			<div className="relative flex justify-center">
				<span className="bg-white px-2 text-sm text-dark-100">{text}</span>
			</div>
		</div>
	);
};
