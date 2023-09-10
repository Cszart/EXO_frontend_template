/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import styles from './Input.module.css';

import * as React from 'react';

type Props = Readonly<{
	'data-test-id'?: string;
	label: string;
	onChange: (arg0: string) => void;
	placeholder?: string;
	value?: string | number;
	inputType?: React.HTMLInputTypeAttribute;
}>;

export default function TextEditorTextInput({
	label,
	value,
	onChange,
	placeholder = '',
	'data-test-id': dataTestId,
	inputType,
}: Props): JSX.Element {
	const initValue = '';
	return (
		<div className={styles.Input__wrapper}>
			<label className={styles.Input__label}>{label}</label>
			<input
				type={inputType || 'text'}
				className={styles.Input__input}
				placeholder={placeholder}
				value={value || initValue}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				data-test-id={dataTestId}
			/>
		</div>
	);
}
