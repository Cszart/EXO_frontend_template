import React, { useEffect, useState } from 'react';
import {
	PaginatedTableProps,
	SimpleTableProps,
} from 'interfaces/components/tables';
import SimpleTable from './simpleTable';
import PaginationBar from '../paginationBar/paginationBar';

const PaginatedTable = <T,>(
	props: PaginatedTableProps<T> & Omit<SimpleTableProps<T>, 'rows'>
): JSX.Element => {
	const [currentPage, setCurrentPage] = useState<number>(props.page);

	// Set rows data in case there is a fetching function
	const [rowsData, setRowsData] = useState<T[]>([]);

	// In case rowsData is a function the it needs to fetch the data from endpoint
	const handleSetRows = async (): Promise<void> => {
		if (Array.isArray(props.rows)) {
			setRowsData(props.rows);
		} else {
			// This call wont necessarily be this easy, might need to change this depending on the
			// backend project
			console.log('\n\n\n <- Paginated table, fetching pages : ', {
				currentPage,
				pageSize: props.pageSize,
			});
			const responseRows = await props.rows(currentPage, props.pageSize);
			console.log('<- Response : ', { responseRows });
			setRowsData(responseRows);
		}
	};
	useEffect(() => {
		handleSetRows();
	}, [props.rows, currentPage, props.pageSize]);

	return (
		<div className="flex flex-col gap-4 w-auto relative overflow-auto shadow-md rounded-lg">
			{/* Table Container */}
			<SimpleTable {...props} rows={rowsData} />

			{/* Paginated information */}
			<PaginationBar
				currentPage={currentPage}
				totalPages={100}
				onPageChange={(pageNumber: number) => {
					console.log('\n\n<- On page change : ', { pageNumber });
					setCurrentPage(pageNumber);
				}}
				classNameContainer="self-center"
			/>
		</div>
	);
};

export default PaginatedTable;
