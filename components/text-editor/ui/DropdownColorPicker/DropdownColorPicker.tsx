/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import TextEditorDropDown from '../Dropdown/DropDown';
import TextEditorColorPicker from '../ColorPicker/ColorPicker';

type Props = {
	disabled?: boolean;
	buttonAriaLabel?: string;
	buttonClassName: string;
	buttonIconClassName?: string;
	buttonIconName?: string;
	buttonLabel?: string;
	title?: string;
	stopCloseOnClickSelf?: boolean;
	color: string;
	onChange?: (color: string, skipHistoryStack: boolean) => void;
};

export default function TextEditorDropdownColorPicker({
	disabled = false,
	stopCloseOnClickSelf = true,
	color,
	onChange,
	...rest
}: Props): React.JSX.Element {
	return (
		<TextEditorDropDown
			{...rest}
			disabled={disabled}
			stopCloseOnClickSelf={stopCloseOnClickSelf}
		>
			<TextEditorColorPicker color={color} onChange={onChange} />
		</TextEditorDropDown>
	);
}
