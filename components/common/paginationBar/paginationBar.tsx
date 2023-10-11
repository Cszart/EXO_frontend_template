import clsx from 'clsx';
import React from 'react';

interface PaginationBarProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;

	showFirstButton?: boolean;
	showLastButton?: boolean;

	classNameContainer?: string;
	classNameActivePage?: string;
	classNamePage?: string;
	classNameButtons?: string;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
	totalPages,
	currentPage,
	onPageChange,

	showFirstButton = true,
	showLastButton = true,

	classNameContainer = 'w-fit',
	classNameActivePage = 'text-blue-500 font-bold bg-indigo-100 hover:bg-indigo-300 hover:text-blue-800 border-y',
	classNamePage = 'text-gray-500 font-medium bg-stone-100 hover:bg-stone-300 hover:text-gray-800 border-y',
	classNameButtons = 'text-gray-500 font-medium bg-stone-100 hover:bg-stone-300 hover:text-gray-800 border-y',
}) => {
	const pageNumbers = Array.from(
		{ length: totalPages },
		(_, index) => index + 1
	);

	const firstPage = 1;
	const lastPage = totalPages;

	const renderPageNumbers = (): JSX.Element[] => {
		if (totalPages <= 10) {
			return pageNumbers.map((pageNumber) => (
				<button
					key={pageNumber}
					className={clsx(
						'flex items-center justify-center p-2',
						'leading-tight',
						{
							[classNameActivePage]: pageNumber === currentPage,
							[classNamePage]: pageNumber !== currentPage,
						}
					)}
					onClick={() => onPageChange(pageNumber)}
				>
					{pageNumber}
				</button>
			));
		} else {
			const visiblePages = [
				currentPage - 2,
				currentPage - 1,
				currentPage,
				currentPage + 1,
				currentPage + 2,
			].filter(
				(pageNumber) => pageNumber >= firstPage && pageNumber <= lastPage
			);

			return visiblePages.map((pageNumber, index) => (
				<button
					key={index}
					className={clsx(
						'flex items-center justify-center p-2',
						'leading-tight',
						{
							[classNameActivePage]: pageNumber === currentPage,
							[classNamePage]: pageNumber !== currentPage,
						}
					)}
					onClick={() => onPageChange(pageNumber)}
				>
					{pageNumber}
				</button>
			));
		}
	};

	return (
		<nav
			className={clsx(
				'flex items-center justify-center divide-x divide-gray-300',
				classNameContainer
			)}
		>
			{/* Buttons */}
			{showFirstButton && (
				<button
					className={clsx(
						'flex items-center justify-center p-2',
						'leading-tight border-l rounded-l-lg',
						classNameButtons
					)}
					disabled={currentPage === firstPage}
					onClick={() => onPageChange(firstPage)}
				>
					First
				</button>
			)}

			<button
				className={clsx(
					'flex items-center justify-center p-2',
					'leading-tight',
					classNameButtons
				)}
				disabled={currentPage === firstPage}
				onClick={() => onPageChange(currentPage - 1)}
			>
				Prev
			</button>

			{/* Pages */}
			{renderPageNumbers()}

			{/* Buttons */}
			<button
				className={clsx(
					'flex items-center justify-center p-2',
					'leading-tight',
					classNameButtons
				)}
				disabled={currentPage === lastPage}
				onClick={() => onPageChange(currentPage + 1)}
			>
				Next
			</button>
			{showLastButton && (
				<button
					className={clsx(
						'flex items-center justify-center p-2',
						'leading-tight !border-r rounded-r-lg',
						classNameButtons
					)}
					disabled={currentPage === lastPage}
					onClick={() => onPageChange(lastPage)}
				>
					Last
				</button>
			)}
		</nav>
	);
};

export default PaginationBar;
