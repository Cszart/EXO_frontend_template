import * as React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

interface BasicTableProps {
	columns: string[];
	rows: Record<string, any>[];
}

export const BasicTable: React.FC<BasicTableProps> = ({ columns, rows }) => {
	return (
		<div className="w-full overflow-hidden overflow-x-auto scroll-custom border border-dark-60 rounded-lg">
			<table className="w-full table-auto divide-y divide-dark-60">
				<thead className="bg-dark-10">
					<tr className="text-left text-sm font-semibold text-dark-100 capitalize whitespace-nowrap">
						{columns.map((column) => (
							<th key={column} scope="col" className="px-3 py-4">
								{column}
							</th>
						))}

						{/* Optional */}
						<th scope="col" className="px-3 py-4">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-dark-60 bg-white">
					{rows.map((item, index) => (
						<tr key={index} className="text-sm text-dark-100">
							{columns.map((column) => (
								<td key={column} className="px-3 py-4">
									{item[column]}
								</td>
							))}
							{/* Optional */}
							<td className="px-3 py-4">
								<EllipsisHorizontalIcon
									width={24}
									height={24}
									className="text-dark-60"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
