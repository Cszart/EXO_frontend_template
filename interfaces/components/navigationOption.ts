import { Option } from './option';

export interface NavigationOptions extends Option {
	subOptions?: Option[];
}
