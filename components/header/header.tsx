/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface HeaderNavbarProps {
	links?: {
		name: string;
		href: string;
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
				'flex items-center justify-between border p-6',
				className
			)}
		>
			{/* Logo */}
			<div className="text-white">
				<Link href="/">
					<a className="text-2xl font-bold">
						<img src={logoUrl} alt="Logo" className="h-8 max-h-8" />
					</a>
				</Link>
			</div>

			{/* Text Links */}
			<div>
				<ul className="flex space-x-4">
					{links &&
						links.map((link, index) => (
							<li key={index}>
								<Link href={link.href}>
									<a className="text-white">{link.name}</a>
								</Link>
							</li>
						))}
				</ul>
			</div>
		</nav>
	);
};

export default HeaderNavbar;
