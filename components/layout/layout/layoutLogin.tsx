import * as React from 'react';

type LayoutLoginProps = {
	children: React.ReactNode;
};
export const LayoutLogin: React.FC<LayoutLoginProps> = ({ children }) => {
	return (
		<div className="w-full min-h-screen bg-primary flex items-center justify-center">
			<div className="w-full max-w-md p-6">
				<div className="bg-white rounded-2xl flex flex-col px-6 py-10 lg:px-12 justify-center items-center w-full">
					{children}
				</div>
			</div>
		</div>
	);
};
