import { Transition, Dialog } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, useState } from 'react';

interface ModalProps {
	title?: string;
	className?: string;
	children?: React.ReactNode;
}

/**
 * Custom hook to return a modal with its handler functions,
 * the returned modal has a default layout
 *
 * @returns
 * 		Modal: Default Modal element that will be rendered
 * 		isOpen: usual modal prop that says when the modal should appear
 * 		show: Handler function to show the modal
 * 		hide: Handler function to hide the modal
 */

const useModal = (): {
	Modal: React.FC<ModalProps>;
	isOpen: boolean;
	show: () => void;
	hide: () => void;
} => {
	const cancelButtonRef = React.useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const show = (): void => {
		setIsOpen(true);
	};

	const hide = (): void => {
		setIsOpen(false);
	};

	const Modal = (props: ModalProps): JSX.Element => (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={hide}
				static
				initialFocus={cancelButtonRef}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="fixed inset-0"
						style={{ background: 'rgba(33, 37, 41, 0.4)' }}
					/>
				</Transition.Child>

				<div className={clsx('fixed inset-0 overflow-y-auto', props.className)}>
					<div className="flex h-full items-center  justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel
								className={clsx(
									'transform shadow-xl transition-all',
									'rounded-2xl bg-white w-full max-w-md p-6 text-left align-middle'
								)}
							>
								<Dialog.Title
									as="h3"
									className="text-lg font-bold text-gray-900"
								>
									{props.title}
								</Dialog.Title>

								{props.children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);

	return { Modal, isOpen, show, hide };
};

export default useModal;
