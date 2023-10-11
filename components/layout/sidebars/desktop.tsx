import React, { useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { NavigationOptions } from 'interfaces';
import Image from 'next/image';
import AppRoutes from 'const/routes';
import { Disclosure, Transition } from '@headlessui/react';
import { Icon, Typography } from 'components/common';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { itemIsNotNullAndNotUndefined } from 'utils';

interface SidebarDesktopProps {
	itemOptions: NavigationOptions[];
	logo?: string;
	collapsible?: boolean;

	classNameContainer?: string; // Container classes
	classNameItem?: string; // Typography classes
	classNameItemButton?: string; // Dropdown button classes
}

export const SidebarDesktop: React.FC<SidebarDesktopProps> = ({
	itemOptions,
	logo,
	collapsible = true,

	classNameContainer = 'bg-primary',
	classNameItem = 'text-white',
	classNameItemButton = '',
}) => {
	useEffect(() => {
		console.log('<- SideBar : ', { itemOptions, logo, collapsible });
	}, [collapsible, itemOptions, logo]);

	/**
	 * This function is to render the proper Element based on the item
	 * features, this will render the basic elements, the dropdown element will
	 * be rendered with a condition outside this function for readibility
	 * @param item The item that will be evaluated
	 * @returns The proper JSX.Element (Link, Text with onClick, Custom)
	 */
	const handleRenderItem = (item: NavigationOptions): JSX.Element | null => {
		switch (true) {
			// If the item to be rendered is custom
			case itemIsNotNullAndNotUndefined(item.customRender):
				return <>{item.customRender}</>;

			// Item to be rendered is link
			case item.href != undefined && item.href != null:
				return (
					<Link href={item.href ?? '#'}>
						<Typography type="subtitle-2" className={clsx(classNameItem)}>
							{item.label}
						</Typography>
					</Link>
				);

			// Item to be rendered is an action
			case itemIsNotNullAndNotUndefined(item.onClick):
				return (
					<Typography
						type="subtitle-2"
						onClick={item.onClick}
						className={clsx(classNameItem)}
					>
						{item.label}
					</Typography>
				);

			// no case inside the item
			default:
				return null;
		}
	};

	return (
		<div
			className={clsx(
				'sticky top-0 left-0 z-30 h-screen',
				'transition-transform -translate-x-full sm:translate-x-0',
				classNameContainer
			)}
		>
			<nav
				className={clsx(
					'h-full p-4 overflow-y-auto',
					'flex flex-col gap-4',
					'w-max min-w-[200px] max-w-[250px]',
					classNameContainer
				)}
			>
				{logo && (
					<Link href={AppRoutes.HOME}>
						<Image src={logo} alt="Sidebar Logo" className="max-w-[50px]" />
					</Link>
				)}

				{/* Render each item */}
				{itemOptions.map((item) => {
					return (
						<div
							key={`sideNavbar-item-${item.name}`}
							className="flex flex-wrap gap-1 w-full justify-start items-center"
						>
							{/* Icon */}
							{item.icon && !item.subOptions && (
								<div className="w-4">
									<Icon {...item.iconProps} src={item.icon} />
								</div>
							)}

							{/* Render handler (Link, OnClick, Custom) */}
							{handleRenderItem(item)}

							{/* Dropdown item */}
							{item.subOptions && (
								<Disclosure as="div" className="">
									<Disclosure.Button
										className={clsx(
											'flex flex-wrap justify-start items-center gap-1 w-auto',
											classNameItemButton
										)}
									>
										{/* Icon */}
										{item.icon && (
											<div className="w-4">
												<Icon {...item.iconProps} src={item.icon} />
											</div>
										)}

										{/* Label */}
										<Typography
											type="subtitle-2"
											className={clsx(classNameItem)}
										>
											{item.label}
										</Typography>

										{/* Arrow Icon */}
										<ChevronRightIcon className="text-white w-6 ui-open:rotate-90 ui-open:transform" />
									</Disclosure.Button>

									{item.subOptions.map((subItem) => {
										return (
											<Transition
												key={`sideNavbar-item-${item.name}-subItem-${subItem.name}`}
												enter="transition duration-100 ease-out"
												enterFrom="transform scale-95 opacity-0"
												enterTo="transform scale-100 opacity-100"
												leave="transition duration-75 ease-out"
												leaveFrom="transform scale-100 opacity-100"
												leaveTo="transform scale-95 opacity-0"
											>
												<Disclosure.Panel className="flex flex-wrap gap-1 w-full justify-start items-center pl-6">
													{/* SubItem Icon */}
													{subItem.icon && typeof subItem.icon == 'string' && (
														<div className="w-4">
															<Icon src={subItem.icon} />
														</div>
													)}
													{subItem.icon && typeof subItem.icon != 'string' && (
														<>{item.icon}</>
													)}

													{/* Render handler */}
													{handleRenderItem(subItem)}
												</Disclosure.Panel>
											</Transition>
										);
									})}
								</Disclosure>
							)}
						</div>
					);
				})}
			</nav>
		</div>
	);
};
