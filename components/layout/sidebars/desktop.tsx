import React, { Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Typography } from 'components/form';
import { sidebarNavigation } from 'const';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export const SidebarDesktop: React.FC = () => {
	const router = useRouter();
	return (
		<>
			{/*  Sidebar desktop */}
			<div className="hidden md:flex flex-shrink-0 bg-primary w-[250px] xl:w-[300px] 2xl:w-[350px]">
				<div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto scroll-custom">
					<nav className="mt-[50px] flex-1" aria-label="Sidebar">
						{sidebarNavigation.map((item, index) => {
							const active = router.asPath.includes(item.name);
							return item.children ? (
								<Disclosure
									as="div"
									key={`desktopItem-${index}`}
									defaultOpen={active}
								>
									{({ open }) => (
										<>
											<Disclosure.Button
												className={clsx(
													{ 'font-bold': active },
													'group text-white flex w-full items-center px-10 py-4 focus:outline-none'
												)}
											>
												<div className="flex justify-between items-center w-full">
													<Typography type="link-1">{item.label}</Typography>
													{open ? (
														<ChevronDownIcon width={16} height={16} />
													) : (
														<ChevronRightIcon width={16} height={16} />
													)}
												</div>
											</Disclosure.Button>
											{item?.children?.map((subItem, j) => {
												return (
													<Disclosure.Panel
														className="px-16 py-2 text-white"
														key={`desktopSubItem-${j}`}
													>
														<Link href={subItem.href}>
															<Typography type="link-1">
																{subItem.label}
															</Typography>
														</Link>
													</Disclosure.Panel>
												);
											})}
										</>
									)}
								</Disclosure>
							) : (
								<Fragment key={`desktopItem-${index}`}>
									<Link href={item.href}>
										<span
											className={clsx(
												{ 'font-bold': active },
												'text-white group hover:bg-opacity-25 flex justify-between w-full px-10 py-4'
											)}
										>
											<Typography type="link-1">{item.label}</Typography>
											<ChevronRightIcon width={16} height={16} />
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
