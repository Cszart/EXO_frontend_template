import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

export interface DropdownProps {
	// String or Icon
	display: string | JSX.Element;

	// Should be false when rendering only icons
	showChevronDownIcon?: boolean;

	// Items to render
	items?: {
		display: string;
		onClick: () => void;
	}[];

	customItems?: JSX.Element;
}

export const Dropdown = (props: DropdownProps): JSX.Element => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
				{props.display}
				{props.showChevronDownIcon && (
					<ChevronDownIcon
						className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
						'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100',
						'rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
						'flex flex-col'
					)}
				>
					{props.customItems && <>{props.customItems}</>}
					{!props.customItems &&
						props.items?.map((item, index) => {
							return (
								<Menu.Item key={`dropDown-option-${item.display}-${index}`}>
									<button
										className={clsx(
											'ui-active:bg-blue-500 ui-active:text-white',
											'ui-not-active:bg-white ui-not-active:text-black',
											'hover:bg-red'
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
