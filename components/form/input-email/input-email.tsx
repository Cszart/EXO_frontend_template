/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Input } from '../input/input';
import { InputProps } from 'interfaces';
import { CypressI } from 'interfaces/cypress';

export const InputEmail: React.FC<
	InputProps & CypressI & React.InputHTMLAttributes<HTMLInputElement>
> = ({ rules, ...props }) => {
	return (
		<>
			<Input
				type="text"
				rules={{
					...rules,
					pattern: {
						value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
						message: 'Wrong email address',
					},
					maxLength: {
						value: 35,
						message: 'Your email address has to have less than 35 characters',
					},
				}}
				onChangeCustom={(e: any) => {
					if (e.target.value.length > 35) {
						e.target.value = e.target.value.substr(0, 35);
					}
				}}
				{...props}
			></Input>
		</>
	);
};
