import React, { Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Typography } from 'components/form';
import { sidebarNavigation } from 'const';

export const SidebarDesktop: React.FC = () => {
	const router = useRouter();
	return (
		<>
			{/*  Sidebar desktop */}
			<div className="hidden md:flex flex-shrink-0 bg-primary w-[250px] xl:w-[300px] 2xl:w-[350px]">
				<div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto scroll-custom">
					<nav className="mt-[50px] flex-1" aria-label="Sidebar">
						{sidebarNavigation.map((item: any, i: number) => {
							const active = router.asPath.includes(item.href);
							return (
								<Fragment key={`desktopItem-${i}`}>
									<Link href={item.href}>
										<span
											className={clsx(
												{ 'font-bold': active },
												'text-white group hover:bg-opacity-25 flex flex-col w-full px-10 py-4 hover:opacity-90'
											)}
										>
											<Typography type="link-1">{item.label}</Typography>
										</span>
									</Link>
								</Fragment>
							);
						})}
					</nav>
				</div>
			</div>
		</>
	);
};
