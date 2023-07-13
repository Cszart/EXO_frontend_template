import React from 'react';

export interface Footer_Props {
	links?: {
		title: string;
		url: string;
	}[];

	companyName?: string;
	rightsYear?: string;
}

const Footer: React.FC<Footer_Props> = ({ links, companyName, rightsYear }) => {
	return (
		<footer className="flex w-full bg-gray-200 border py-4">
			<div className="flex flex-col w-auto mx-auto text-center">
				{/* Links list */}
				<ul className="flex justify-center space-x-4">
					{links?.map((link, index) => (
						<li key={index}>
							<a href={link.url} className="text-gray-600 hover:text-gray-800">
								{link.title}
							</a>
						</li>
					))}
				</ul>

				{/* Rights */}
				<p className="text-gray-600 mt-2">
					{`© ${rightsYear} ${companyName}. All rights reserved.`}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
