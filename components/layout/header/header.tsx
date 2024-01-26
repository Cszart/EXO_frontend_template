/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { NavigationOptions, Option } from 'interfaces';
import { Dropdown } from 'components/common/dropdown';
import { Avatar, Typography } from 'components/common';
import Icons from 'const/icons';
import { buildHeaderUserProfileOptions } from 'utils';
import { headerUserProfileOptions } from 'const';
import { useSession } from 'next-auth/react';

interface HeaderNavbarProps {
	navBarOptions?: NavigationOptions[];
	logoUrl: string;
	className?: string;
}

/**
 *	This component is meant to be rendered as a header navBar
 * 	Its a basic component mostly customizable from the navBarOptions prop
 *
 * @param navBarOptions options to be rendered in the header
 * @param logoUrl The logo that will be shown in the left side of the header
 * @param className additional classes
 * @returns JSX element representing the header
 */
const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
	navBarOptions,
	logoUrl,
	className,
}) => {
	const session = useSession();
	const [userProfileOptions, setUserProfileOptions] = useState<Option[]>([]);

	// Build dropdown menu for user profile
	useEffect(() => {
		if (session != null) {
			const updatedOptions = buildHeaderUserProfileOptions(
				headerUserProfileOptions,
				session.status
			);

			setUserProfileOptions(updatedOptions);
		}
	}, [session]);

	return (
		<nav
			className={clsx(
				'flex items-center justify-between w-full shadow-sm px-6 py-3 bg-primary',
				className
			)}
		>
			{/* Logo */}
			<Link href="/">
				<img src={logoUrl} alt="Logo" className="h-8 max-h-8" />
			</Link>

			{navBarOptions && (
				<div className="flex flex-wrap justify-center items-center gap-3 w-auto">
					{navBarOptions.map((option) => {
						// Render a custom item if is the case
						if (option.customRender) {
							return <>{option.customRender}</>;

							// Render a dropdown menu
						} else if (option.subOptions) {
							return (
								<Dropdown
									key={`header-navbar-option-${option.name}`}
									buttonContent={option.label}
									showChevronDownIcon={true}
									items={option.subOptions}
									classNameButton="text-white text-sm"
								/>
							);

							// Render a link
						} else if (option.href) {
							return (
								<Link
									href={option.href}
									key={`header-navbar-option-${option.name}`}
								>
									<Typography
										key={`header-navbar-option-${option.name}`}
										type="subtitle-2"
										className="cursor-pointer text-white"
									>
										{option.label}
									</Typography>
								</Link>
							);

							// Render a text that has onClick action
						} else {
							return (
								<Typography
									key={`header-navbar-option-${option.name}`}
									type="subtitle-2"
									onClick={option.onClick}
									className="cursor-pointer text-white"
								>
									{option.label}
								</Typography>
							);
						}
					})}
				</div>
			)}

			{/* Profile */}
			<Dropdown
				buttonContent={<Avatar photoUrl={Icons.avatar} size="small" />}
				showChevronDownIcon={true}
				items={userProfileOptions}
				classNameButton="w-auto text-white"
			/>
		</nav>
	);
};

export default HeaderNavbar;
