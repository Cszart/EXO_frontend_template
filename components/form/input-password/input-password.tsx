import * as React from 'react';
import { Input } from '../input/input';
import { InputProps } from 'interfaces';
import Icons from 'const/icons';

const InputPassword: React.FC<
	InputProps &
		React.InputHTMLAttributes<HTMLInputElement> & {
			validate?: boolean;
		}
> = ({ rules, validate = true, ...props }) => {
	const [isVisible, setIsVisible] = React.useState(false);
	const handleClick = () => {
		setIsVisible(!isVisible);
	};

	/*
		Minimum length 8 characters (no maximum). 
		One character must be uppercase.
		One character must be lowercase.
		Minimum one numeric character. 
		Include a special character (ex. *: ;-). 
		Users will not be able to choose this style of password combinations: qwerty, password, qwerty1234, 1234, among others.
  	*/
	const finalRules = React.useMemo(() => {
		if (validate) {
			return {
				...rules,
				validate: (value: string) =>
					!value.match(
						new RegExp(
							'qwerty|password|admin|test|administrator|1234|qwerty1234',
							'i'
						)
					) ||
					`qwerty | password | admin | test | administrator | 1234 is not valid`,
				pattern: {
					value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&'.*])[^ ]{0,}$/g,
					message:
						'Your password must have 1 minus, 1 mayus, 1 number and 1 special character',
				},
			};
		}
		return {
			...rules,
		};
	}, [rules, validate]);

	return (
		<Input
			type={isVisible ? 'text' : 'password'}
			rules={finalRules}
			iconRight={isVisible ? Icons.visible : Icons.invisible}
			rightClick={handleClick}
			{...props}
		/>
	);
};
export default InputPassword;
