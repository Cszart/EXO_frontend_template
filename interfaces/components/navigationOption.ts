import { Option } from './option';

export interface Navigation extends Option {
	children?: Option[];
}
