export interface Option {
	name: string;
	label: string;
	href: string;
	icon?: string;
	onClick?: () => void;
}

export interface Navigation extends Option {
	children?: Option[];
}
