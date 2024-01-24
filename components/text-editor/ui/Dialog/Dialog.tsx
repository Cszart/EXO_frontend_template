/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import styles from './Dialog.module.css';

import * as React from 'react';
import { ReactNode } from 'react';

type Props = Readonly<{
	'data-test-id'?: string;
	children: ReactNode;
}>;

// Replace class names in the JSX with styles from the CSS Module
export function TextEditorDialogButtonsList({ children }: Props): JSX.Element {
	return <div className={styles.DialogButtonsList}>{children}</div>;
}

export function TextEditorDialogActions({
	'data-test-id': dataTestId,
	children,
}: Props): JSX.Element {
	return (
		<div className={styles.DialogActions} data-test-id={dataTestId}>
			{children}
		</div>
	);
}
