export interface ColumnProps<T> {
	header: string;
	content: (instance: T) => JSX.Element;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
}

export interface ColumnActionProps<T> {
	label: string;
	onClick: (instance: T) => void;
}

export interface PaginatedTableProps<T> {
	/**
	 * Data for each of the columns of the table
	 */
	columns: ColumnProps<T>[];

	/**
	 * The data to show on the rows
	 * Or a function that will handle fetching the content
	 */
	rows: T[] | ((page: number, rowsPerPage: number) => Promise<T[]>);

	/**
	 * Number of page to show
	 */
	page: number;

	/**
	 * Number of rows to show in a page
	 */
	rowsPerPage: number;

	/**
	 * Actions specified here will be added to the Actions menu
	 */
	rowActions?: (instance: T) => ColumnActionProps<T>[];

	/**
	 * If `true`, the actions section in each column will be not rendered
	 */
	hideRowActions?: boolean;

	/**
	 * Element to be render instead of actions dropdown menu.
	 */
	rowActionsCustom?: JSX.Element;

	/**
	 * If table is in loading state
	 */
	isLoading?: boolean;

	/**
	 * Show custom element when table is in loading state
	 */
	isLoadingElement?: JSX.Element;

	/**
	 * Component to render if table data is empty.
	 * Default value is "No data to display"
	 */
	tableEmptyComponent?: JSX.Element;

	/**
	 * GenericTable prop
	 * If true, the table header will stick to the top as the user scrolls down the table
	 */
	stickyHeader?: boolean;

	// --- Style props --- //
	/**
	 * Style for table headers (Tailwind string)
	 */
	stylesForHeader?: string;

	/**
	 * Style for row actions (Tailwind string)
	 */
	stylesForRowActions?: string;
}
