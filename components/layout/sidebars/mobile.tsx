import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Typography } from 'components/common';
import sidebarNavigation from 'const/navigation';

interface LayoutDashboardProps {
	sidebarOpen?: boolean;
	setSidebarOpen: (value: boolean) => void;
	// initialFocus?: any;
}
export const SidebarMobile: React.FC<LayoutDashboardProps> = ({
	sidebarOpen = false,
	setSidebarOpen,
	// initialFocus,
}) => {
	const router = useRouter();

	return (
		<>
			{/* Sidebar mobile */}
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as="div"
					static
					className="fixed inset-0 flex z-40 md:hidden bg-white"
					open={sidebarOpen}
					onClose={setSidebarOpen}
					// initialFocus={initialFocus}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="bg-secondary-default relative flex-1 flex flex-col max-w-xs w-full">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute top-0 right-0 -mr-12 pt-2">
									<button
										className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										onClick={() => setSidebarOpen(false)}
									>
										<span className="sr-only">Close sidebar</span>
										{/* <XIcon
											className="w-full p-1 text-white bg-secondary-default rounded-full"
											aria-hidden="true"
										/> */}
									</button>
								</div>
							</Transition.Child>
							<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
								<div className="flex-shrink-0 flex items-center px-4">
									<Link href="/">
										<span
											className={clsx(
												'cursor-pointer flex items-center justify-center'
											)}
										>
											{/* <img className="max-w-[244px]" src={Images.logo} alt="" /> */}
										</span>
									</Link>
								</div>
								<nav className="mt-5 flex-1">
									{sidebarNavigation.map((item, i) => {
										const active = router.asPath.includes(item.href);
										return (
											<div key={`mobileItem-${i}`}>
												<Link href={item.href}>
													<span
														className={clsx(
															active
																? 'text-white font-bold'
																: 'text-secondary-disable',
															'group hover:bg-secondary-hover flex flex-col w-full items-center px-10 py-4 hover:opacity-90 f-16'
														)}
													>
														<div className="flex w-full justify-between">
															<div className="flex items-center">
																{/* <img
																	src={active ? item.iconActive : item.icon}
																	className="mr-2 flex-shrink-0 h-4 w-4"
																	aria-hidden="true"
																	alt="rectangle"
																/> */}
																<Typography type="link-1">
																	{item.label}
																</Typography>
															</div>
															<div className="flex items-center">
																{/* {item.name !== 'dashboard' && (
																	<img
																		src={
																			active && item.children
																				? Icons.chevronDown
																				: Icons.chevronRight
																		}
																		className="flex-shrink-0 "
																		aria-hidden="true"
																		alt="chevron"
																	/>
																)} */}
																{item.name === 'dashboard' && active && (
																	<div className="flex items-center h-[2px] w-12 bg-white ml-6 mt-1"></div>
																)}
															</div>
														</div>
													</span>
												</Link>
											</div>
										);
									})}
								</nav>
							</div>
						</div>
					</Transition.Child>
					<div className="flex-shrink-0 w-14" aria-hidden="true">
						{/* Force sidebar to shrink to fit close icon */}
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};
