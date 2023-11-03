import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value
 *
 * @param value The value that will be debounced
 * @param delay Time to wait before return
 * @returns Debounced value
 */
const useDebouncer = <T,>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebouncer;
