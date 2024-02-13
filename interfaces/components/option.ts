/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconProps } from 'components/common';
import { ReactNode } from 'react';

/**
 * General option props
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Option {
	name: string;
	label: string;
	href?: string;
	icon?: string;
	iconProps?: IconProps;
	onClick?: ((instance: any) => void) | (() => void);
	customRender?: ReactNode;
	placeholder?: boolean;
}
