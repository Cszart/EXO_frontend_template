import * as React from 'react';
import clsx from 'clsx';

export interface ButtonProps {
	className?: string;
	disabled?: boolean;
	decoration?: 'fill' | 'line-white' | 'line-primary' | 'none';
	size?: 'extra-small' | 'small' | 'medium' | 'large' | 'full';
	onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<
	ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, disabled = false, decoration, size, onClick, children }) => {
	return (
		<>
			<button
				type="button"
				disabled={disabled}
				onClick={onClick}
				className={clsx(
					//size
					{ 'w-full': size === 'full' },
					{ 'w-75': size === 'large' },
					{ 'w-61': size === 'medium' },
					{ 'w-48': size === 'small' },
					{ 'w-37': size === 'extra-small' },

					// fill
					{
						'text-gray-0 bg-primary border-primary': decoration === 'fill',
					},
					{
						'hover:text-primary hover:border-primary hover:bg-transparent':
							decoration === 'fill' && !disabled,
					},

					// not fill white
					{
						'text-gray-0 border-gray-0': decoration === 'line-white',
					},
					{
						'hover:bg-primary hover:text-gray-0 hover:border-primary':
							decoration === 'line-white' && !disabled,
					},

					// not fill primary
					{
						'text-primary border-primary': decoration === 'line-primary',
					},
					{
						'hover:bg-primary hover:text-gray-0 hover:border-primary':
							decoration === 'line-primary' && !disabled,
					},

					// none
					{
						'text-gray-800 font-medium': decoration === 'none',
					},

					// global
					'group flex items-center justify-center border rounded-[26px]',
					'outline-none transition-colors duration-200',
					'focus:outline-none disabled:cursor-not-allowed',
					className
				)}
			>
				{children}
			</button>
		</>
	);
};
