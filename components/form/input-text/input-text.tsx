import * as React from 'react';
import { InputProps } from 'interfaces';
import { Input } from '../input/input';
import { CypressI } from 'interfaces/cypress';

export const InputText: React.FC<
	InputProps & CypressI & React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
	return (
		<>
			<Input type="text" {...props}></Input>
		</>
	);
};
