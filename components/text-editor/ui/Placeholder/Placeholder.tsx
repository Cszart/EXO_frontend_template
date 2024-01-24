/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import styles from './Placeholder.module.css';

import * as React from 'react';
import { ReactNode } from 'react';

// Replace class names in the JSX with styles from the CSS Module
export default function TextEditorPlaceholder({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}): JSX.Element {
	return (
		<div className={className || styles.Placeholder__root}>{children}</div>
	);
}
