/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Option } from 'interfaces';
import { DropdownProfile } from '../profile';

interface HeaderNavbarProps {
	links: Option[];
	logoUrl: string;
	className?: string;
}

const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
	links,
	logoUrl,
	className,
}) => {
	return (
		<nav
			className={clsx(
				'flex items-center justify-between w-full shadow-sm px-6 py-3',
				'bg-primary',
				className
			)}
		>
			{/* Logo */}
			<Link href="/">
				<img src={logoUrl} alt="Logo" className="h-8 max-h-8" />
			</Link>

			{/* Profile */}
			<DropdownProfile links={links} />
		</nav>
	);
};

export default HeaderNavbar;
