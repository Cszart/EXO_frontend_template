/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import styles from './Select.module.css';

import * as React from 'react';

type SelectIntrinsicProps = JSX.IntrinsicElements['select'];
interface SelectProps extends SelectIntrinsicProps {
	label: string;
}

// Replace class names in the JSX with styles from the CSS Module
export default function TextEditorSelect({
	children,
	label,
	className,
	...other
}: SelectProps): JSX.Element {
	return (
		<div className={styles.Input__wrapper}>
			<label style={{ marginTop: '-1em' }} className={styles.Input__label}>
				{label}
			</label>
			<select {...other} className={className || styles.selectContainer}>
				{children}
			</select>
		</div>
	);
}
