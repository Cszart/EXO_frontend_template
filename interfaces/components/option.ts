import { IconProps } from 'components/common';
import { ReactNode } from 'react';

/**
 * General option props
 */
export interface Option {
	name: string;
	label: string;
	href?: string;
	icon?: string;
	iconProps?: IconProps;
	onClick?: () => void;
	customRender?: ReactNode;
}
