import { ColumnProps, PaginatedTableProps } from 'interfaces/components/tables';
import React, { useEffect, useState } from 'react';
import { Dropdown } from '../dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const PaginatedTable = <T,>(props: PaginatedTableProps<T>): JSX.Element => {
	// Redefine columns to show depending if actions should be displayed or not
	const [columnsData, setColumnsData] = useState<ColumnProps<T>[]>([]);

	// Set rows data in case there is a fetching function
	const [rowsData, setRowsData] = useState<T[]>([]);

	// Set columns to display
	useEffect(() => {
		// If row actions is not hidden append a fixed column
		if (!props.hideRowActions) {
			const updatedColumns = props.columns.concat([
				{
					header: 'Actions',
					content: (instance) => {
						if (props.rowActions) {
							// Get the row actions
							const actions = props.rowActions(instance);
							// Format them so they can be rendered by dropdown menu component
							const formattedActions = actions.map((item) => {
								return {
									display: item.label,
									onClick: () => item.onClick(instance), // They could still use instance but dropDownProps doesnt accept parameters
								};
							});
							return (
								<Dropdown
									display={<EllipsisVerticalIcon />}
									showChevronDownIcon={false}
									items={formattedActions}
								/>
							);
						} else {
							return <></>;
						}
					},
				},
			]);
			setColumnsData(updatedColumns);
		}
	}, [props.columns, props.hideRowActions]);

	// In case rowsData is a function the it needs to fetch the data from endpoint
	const handleSetRows = async (): Promise<void> => {
		if (Array.isArray(props.rows)) {
			setRowsData(props.rows);
		} else {
			// This call wont necessarily be this easy, might need to change this depending on the
			// backend project
			const responseRows = await props.rows(props.page, props.rowsPerPage);
			setRowsData(responseRows);
		}
	};
	useEffect(() => {
		handleSetRows();
	}, [props.rows, props.page, props.rowsPerPage]);

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			{/* Table Container */}
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				{/* Header columns */}
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{columnsData.map((column) => {
							return (
								<th
									key={`table-header-${column.header}`}
									scope="col"
									className="px-6 py-3"
								>
									{column.leftIcon && <>{column.leftIcon}</>}
									{column.header}
									{column.rightIcon && <>{column.rightIcon}</>}
								</th>
							);
						})}
					</tr>
				</thead>

				{/* Content Rows */}
				<tbody>
					{rowsData.map((row, index) => {
						return (
							<tr
								key={`table-row-${index}`}
								className={clsx(
									'bg-white border-b dark:bg-gray-800 dark:border-gray-700',
									'hover:bg-gray-50 dark:hover:bg-gray-600'
								)}
							>
								{columnsData.map((column, index) => {
									return (
										<td
											key={`table-row-item-${column.header}-${index}`}
											className="px-6 py-4"
										>
											{column.content(row)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>

			{/* Paginated information */}
			<nav
				className="flex items-center justify-between pt-4"
				aria-label="Table navigation"
			>
				<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
					Showing{' '}
					<span className="font-semibold text-gray-900 dark:text-white">
						1-10
					</span>{' '}
					of{' '}
					<span className="font-semibold text-gray-900 dark:text-white">
						1000
					</span>
				</span>
				<ul className="inline-flex -space-x-px text-sm h-8">
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Previous
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							1
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							2
						</a>
					</li>
					<li>
						<a
							href="#"
							aria-current="page"
							className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
						>
							3
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							4
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							5
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							Next
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default PaginatedTable;
