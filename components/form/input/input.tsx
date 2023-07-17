import * as React from 'react';
import clsx from 'clsx';
import { Typography } from '../typography';
import { InputProps } from 'interfaces';

export const Input: React.FC<
	InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
	name,
	title,
	register,
	rules,
	rightImg,
	leftImg,
	rightClick,
	leftClick,
	customPlaceholder,
	onChangeCustom,
	error,
	className,
	classNameInput,
	...props
}) => {
	const registerAux = register(name, rules);
	return (
		<div className={clsx('relative flex flex-col py-2', className)}>
			<div className="relative">
				<label
					htmlFor="name"
					className={clsx(
						'absolute inline-block text-xs top-[-16px] left-0',
						error ? 'text-status-error-solid' : 'text-dark-80'
					)}
				>
					{title}
				</label>
				<input
					id={name}
					name={name}
					placeholder={customPlaceholder}
					autoComplete={props.autoComplete || 'off'}
					className={clsx(
						classNameInput,
						{
							'text-status-error-solid border-status-error-solid focus:border-status-error-solid placeholder-status-error-solid focus:ring-status-error-solid':
								error,
						},
						{ 'px-4': !leftImg && !rightImg },
						{ 'pl-14 pr-4': leftImg },
						{ 'pl-6 pr-8': rightImg },
						'placeholder-dark-40 py-3 w-full text-xs font-sans border rounded-lg bg-transparent',
						'focus:outline-none focus:ring-offset-transparent',
						'disabled:placeholder-dark-40 disabled:cursor-not-allowed disabled:text-dark-80 disabled:bg-dark-10',
						{
							'focus:ring-dark-80 text-dark-80': !error,
						},
						classNameInput
					)}
					ref={registerAux && registerAux.ref}
					onChange={(e) => {
						registerAux && registerAux.onChange(e); // method from hook form register
						onChangeCustom && onChangeCustom(e); // your method
					}}
					{...props}
				/>
				{leftImg && (
					<div onClick={leftClick} className="absolute left-7 top-1/3 w-5 h-5">
						<img src={leftImg} className="text-dark-80 cursor-pointer" />
					</div>
				)}
				{rightImg && (
					<div
						onClick={rightClick}
						className="absolute right-4 top-[30%] w-4 h-4"
					>
						<img src={rightImg} className="cursor-pointer" />
					</div>
				)}
			</div>
			{error && error.message && (
				<span className="flex items-center mt-1 text-status-error-solid gap-1">
					<Typography type="caption-1">{error.message}</Typography>
				</span>
			)}
		</div>
	);
};
