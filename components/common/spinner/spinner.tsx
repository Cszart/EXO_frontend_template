import * as React from 'react';
import clsx from 'clsx';
import { CypressI } from 'interfaces/cypress';

interface SpinnerProps {
	type?: 'loadingPage';
	width?: string;
	height?: string;
	circleFill?: string;
	loadingBarFill?: string;
	className?: string;
}

export const Spinner: React.FC<SpinnerProps & CypressI> = ({
	dataCY,
	type,
	width = type === 'loadingPage' ? 'w-10' : 'w-6',
	circleFill = 'currentColor',
	loadingBarFill = 'currentColor',
	className,
}) => {
	return (
		<div
			data-cy={dataCY}
			className={clsx('flex items-center justify-center', width, className)}
		>
			<div role="status">
				<svg
					className="w-full animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-40"
						cx="12"
						cy="12"
						r="10"
						stroke={circleFill}
						strokeWidth="4"
					></circle>
					<path
						className="opacity-60"
						fill={loadingBarFill}
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};
