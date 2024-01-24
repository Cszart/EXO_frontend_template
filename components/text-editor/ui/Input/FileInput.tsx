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
	accept?: string;
	label: string;
	onChange: (files: FileList | null) => void;
}>;

// Replace class names in the JSX with styles from the CSS Module
export default function TextEditorFileInput({
	accept,
	label,
	onChange,
	'data-test-id': dataTestId,
}: Props): JSX.Element {
	return (
		<div className={styles.Input__wrapper}>
			<label className={styles.Input__label}>{label}</label>
			<input
				type="file"
				accept={accept}
				className={styles.Input__input}
				onChange={(e) => onChange(e.target.files)}
				data-test-id={dataTestId}
			/>
		</div>
	);
}
