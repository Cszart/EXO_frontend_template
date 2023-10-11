import { ReactNode } from 'react';

export interface Option {
	name: string;
	label: string;
	href?: string;
	icon?: string;
	onClick?: () => void;
	customRender?: ReactNode;
}
