import { ColumnProps, SimpleTableProps } from 'interfaces/components/tables';
import React, { useEffect, useState } from 'react';
import { Dropdown } from '../dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { EmptyState } from '../emptyState';
import { Spinner } from '../spinner';
import { filterRowOptionsByRolesOrPermissions } from 'utils';
import { CypressI } from 'interfaces/cypress';

const SimpleTable = <T,>({
	hideRowActions = false,
	...props
}: SimpleTableProps<T> & CypressI): JSX.Element => {
	// Redefine columns to show depending if actions should be displayed or not
	const [columnsData, setColumnsData] = useState<ColumnProps<T>[]>([]);

	// Set columns to display
	useEffect(() => {
		// If row actions is not hidden append a fixed column
		if (!hideRowActions) {
			const updatedColumns = props.columns.concat([
				{
					header: 'Actions',
					content: (instance: T) => {
						if (props.rowActions) {
							// Get the row actions
							const actions = props.rowActions(instance);
							const filteredActions =
								filterRowOptionsByRolesOrPermissions(actions);
							return (
								<Dropdown
									buttonContent={<EllipsisVerticalIcon className="w-6 h-6" />}
									showChevronDownIcon={false}
									items={filteredActions}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.columns, hideRowActions]);

	return (
		<>
			{props.rows ? (
				props.rows.length > 0 ? (
					<div className="relative overflow-x-auto scroll-custom shadow-md sm:rounded-lg border border-dark-10">
						{/* Table Container */}
						<table
							data-cy={props.dataCY}
							className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
						>
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
								{props.rows.map((row, index) => {
									return (
										<tr
											key={`table-row-${index}`}
											className={clsx(
												'bg-white border-t border-dark-10 dark:bg-gray-800 dark:border-gray-700',
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
					</div>
				) : (
					<EmptyState dataCY={`table-emptyState-${props.dataCY}`} />
				)
			) : (
				<div className="w-full mt-40 flex justify-center items-center">
					<Spinner
						dataCY={`table-spinner-${props.dataCY}`}
						type="loadingPage"
					/>
				</div>
			)}
		</>
	);
};

export default SimpleTable;
