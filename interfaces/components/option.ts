import { IconProps } from 'components/common';
import { ReactNode } from 'react';

export interface Option {
	name: string;
	label: string;
	href?: string;
	icon?: string;
	iconProps?: IconProps;
	onClick?: () => void;
	customRender?: ReactNode;
}
