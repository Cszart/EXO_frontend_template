/**
 * This function is to evaluate when an item is defined
 * @param item the item to be evaluated
 * @returns true when item is defined, false otherwise
 */
export function itemIsNotNullAndNotUndefined(item: unknown): boolean {
	return item != undefined && item != null;
}

/**
 * This function is to evaluate when an item is not defined
 * @param item the item to be evaluated
 * @returns true if the item is not defined or is null, false otherwise
 */
export function itemIsNullOrUndefined(item: unknown): boolean {
	return item == undefined || item == null;
}
