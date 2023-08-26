import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Typography } from 'components/form';
import { Icons } from 'const';
import { Option } from 'interfaces';
import Link from 'next/link';
import { Avatar } from 'components/common';

interface DropdownProfileProps {
	links: Option[];
}

export const DropdownProfile: React.FC<DropdownProfileProps> = ({ links }) => {
	return (
		<div>
			<Menu as="div" className="relative">
				<div>
					<Menu.Button className="inline-flex justify-center cursor-pointer focus:outline-none">
						<Avatar photoUrl={Icons.avatar} size="small" />
						{/* < width="24" /> */}
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute z-10 right-0 origin-top-right shadow-lg rounded-lg w-40">
						{links.map((link, index) => (
							<Menu.Item key={`headerNavbar-Option-${index}`}>
								<div className="flex justify-start items-center py-3 px-6 hover:bg-dark-10 cursor-pointer">
									{/* Link option */}
									{link.href != undefined && link.href != null && (
										<Link href={link.href}>
											<Typography type="subtitle-3" className="text-dark-100">
												{link.label}
											</Typography>
										</Link>
									)}

									{/* Clickable option */}
									{link.onClick != undefined && link.onClick != null && (
										<button type="button" onClick={link.onClick}>
											<Typography type="subtitle-3" className="text-dark-100">
												{link.label}
											</Typography>
										</button>
									)}
								</div>
							</Menu.Item>
						))}
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};
