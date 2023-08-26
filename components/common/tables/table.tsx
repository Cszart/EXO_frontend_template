import * as React from 'react';

interface TablePros {
	columns: string[];
	rows: Record<string, any>[];
}

export const Table: React.FC<TablePros> = ({ columns, rows }) => {
	return (
		<div className="min-w-full overflow-x-auto py-2 align-middle">
			<div className="overflow-hidden border border-dark-60 rounded-lg">
				<table className="min-w-full divide-y divide-dark-60">
					<thead className="bg-dark-10">
						<tr className="text-left text-sm font-semibold text-dark-100 capitalize">
							{columns.map((column) => (
								<th key={column} scope="col" className="px-3 py-4">
									{column}
								</th>
							))}

							<th scope="col" className="px-3 py-4">
								<span className="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-dark-60 bg-white">
						{rows.map((item, index) => (
							<tr key={index} className="text-sm text-dark-100">
								{columns.map((column) => (
									<td key={column} className="whitespace-nowrap px-3 py-4">
										{item[column]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
