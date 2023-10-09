import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export interface DropdownProps {
	display: string | JSX.Element;
	showChevronDownIcon?: boolean;
	items?: {
		display: string;
		onClick: () => void;
	}[];
	customItems?: JSX.Element;

	// Styles
	classNameButton?: string;
	classNameMenuItems?: string;
	classNameItem?: string;
}

export const Dropdown = ({
	classNameButton = 'w-auto rounded-md p-1 bg-stone-200 hover:bg-gray-300',
	classNameMenuItems = 'bg-stone-50 shadow-lg flex flex-col w-max',
	classNameItem = 'text-sm text-gray-700 bg-stone-200 hover:bg-stone-500',
	...props
}: DropdownProps): JSX.Element => {
	return (
		<Menu as="div" className="relative">
			<Menu.Button
				className={clsx(
					'flex justify-center align-center',
					'focus:outline-none',
					'focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-75',
					'relative z-0',
					classNameButton
				)}
			>
				{props.display}
				{props.showChevronDownIcon && (
					<ChevronDownIcon
						className="ml-2 -mr-1 h-5 w-5 text-gray-500 hover:text-gray-700"
						aria-hidden="true"
					/>
				)}
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					className={clsx(
						'absolute right-4 z-50',
						'border focus:outline-none',
						classNameMenuItems
					)}
				>
					{props.customItems && <>{props.customItems}</>}
					{!props.customItems &&
						props.items?.map((item, index) => {
							return (
								<Menu.Item key={`dropDown-option-${item.display}-${index}`}>
									<button
										className={clsx(
											'hover:text-white hover:font-medium p-2',
											classNameItem
										)}
										onClick={item.onClick}
									>
										{item.display}
									</button>
								</Menu.Item>
							);
						})}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
