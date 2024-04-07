import * as React from 'react';
import { SyntheticEvent } from 'react';
import { ErrorOption, RegisterOptions } from 'react-hook-form';

/**
 * General Props for form input
 */
export interface InputProps {
	name: string;
	id?: string;
	dataCY?: string; // Cypress ID attribute
	onChangeCustom?: (e: SyntheticEvent) => void;
	isLogin?: boolean;
	title?: string;
	classNameInput?: string;
	className?: string;
	register: (
		name: string,
		RegisterOptions?: RegisterOptions
	) => {
		onChange: (e: SyntheticEvent) => void;
		onBlur: (e: SyntheticEvent) => void;
		name: string;
		ref: React.Ref<any>;
	};
	customPlaceholder?: string;
	rules?: Record<string, unknown>;
	isDirty?: boolean;
	iconRight?: string | undefined;
	iconLeft?: string | undefined;
	setValueInput?: any;
	labelVisible?: boolean;
	primary?: boolean;
	rightClick?: () => void;
	leftClick?: () => void;
	error?: any;
	setError?: (name: string, error: ErrorOption) => void;
}
