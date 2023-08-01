/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface HeaderNavbarProps {
	links?: {
		name: string;
		href?: string;
		onClick?: () => void;
	}[];
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
				'flex items-center justify-between w-full border-b px-6 py-3',
				'bg-slate-800',
				className
			)}
		>
			{/* Logo */}
			<Link href="/">
				<img src={logoUrl} alt="Logo" className="h-8 max-h-8" />
			</Link>

			{/* Nav options - Text */}
			<ul className="flex space-x-4">
				{links &&
					links.map((link, index) => (
						<li
							key={`headerNavbar-Option-${index}`}
							className="text-lg font-medium text-white cursor-pointer"
						>
							{/* Link option */}
							{link.href != undefined && link.href != null && (
								<Link href={link.href}>{link.name}</Link>
							)}

							{/* Clickable option */}
							{link.onClick != undefined && link.onClick != null && (
								<div onClick={link.onClick}>{link.name}</div>
							)}
						</li>
					))}
			</ul>
		</nav>
	);
};

export default HeaderNavbar;
