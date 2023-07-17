import * as React from 'react';
import { InputProps } from 'interfaces';
import { Input } from '../input/input';

export const InputText: React.FC<
	InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
	return (
		<>
			<Input type="text" {...props}></Input>
		</>
	);
};
