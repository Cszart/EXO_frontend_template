import * as React from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Typography } from 'components/common';

interface Navigation {
	name: string;
	label: string;
	href?: string;
}

interface TabsProps {
	optionsTabs: Navigation[];
	currentOption?: string;
	setCurrentOption: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
	optionsTabs,
	currentOption,
	setCurrentOption,
}) => {
	const router = useRouter();

	return (
		<div className="overflow-x-auto overflow-y-hidden">
			<nav className="flex" aria-label="Tabs">
				<div className="flex gap-x-4 items-center w-full">
					{optionsTabs.map((item) => (
						<button
							type="button"
							key={item.name}
							onClick={() => {
								if (item.href) {
									router.push(item.href);
								} else {
									setCurrentOption(item.name);
								}
							}}
							className={clsx('ring-transparent pb-1', {
								'border-b-2 border-primary': currentOption === item.name,
							})}
						>
							<Typography
								type="link-1"
								className={clsx(
									currentOption === item.name ? 'text-primary' : 'text-dark-40'
								)}
							>
								{item.label}
							</Typography>
						</button>
					))}
				</div>
			</nav>
		</div>
	);
};
