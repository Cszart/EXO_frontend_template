import * as React from 'react';
import clsx from 'clsx';

import { Layout } from 'components/layout';

import { Typography } from 'components/form';
import SimpleTextEditor from 'components/text-editor/textEditor';

const EmailContentEditor = (): any => {
	const [previewContent, setPreviewContent] = React.useState<string>();

	return (
		<Layout
			with_header
			className_children={clsx('flex flex-col items-center w-full pt-10')}
		>
			<Typography
				type="custom-h1"
				text="Content editor for Email"
				className="text-4xl font-bold text-gray-800 mb-10"
			/>
			<SimpleTextEditor
				onChange={(html: string) => {
					setPreviewContent(html);
				}}
			/>

			<div className={clsx('flex flex-col mt-40 max-w-[600px]')}>
				{previewContent}
			</div>
		</Layout>
	);
};

export default EmailContentEditor;
