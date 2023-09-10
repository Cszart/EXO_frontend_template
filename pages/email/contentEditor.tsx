import * as React from 'react';
import clsx from 'clsx';
import parse from 'html-react-parser';

import { Layout } from 'components/layout';

import { Button, Typography } from 'components/form';
import SimpleTextEditor from 'components/text-editor/textEditor';
import useModal from 'components/hooks/useModal';
import { Separator } from 'components/common';
import { XMarkIcon } from '@heroicons/react/24/solid';

const EmailContentEditor = (): any => {
	const [previewContent, setPreviewContent] = React.useState<string>();

	const { Modal, show, hide } = useModal();

	return (
		<>
			<Layout
				withHeader
				withFooter
				withSidebar={false}
				classNameChildren={clsx('flex flex-col items-center w-full pt-10')}
			>
				<Typography
					type="custom-h1"
					text="Content editor for Email"
					className="text-4xl font-bold text-gray-800 mb-5"
				/>

				<Button
					type="button"
					decoration="line-white"
					size="medium"
					onClick={() => show()}
					className="mb-6"
				>
					Preview
				</Button>

				<SimpleTextEditor
					onChange={(html: string) => {
						setPreviewContent(html);
					}}
				/>

				<div className={clsx('flex flex-col mt-40 max-w-[600px]')}>
					{previewContent}
				</div>
			</Layout>

			<Modal className="w-auto max-w-full">
				<div className="flex flex-wrap justify-between items-center w-full">
					<Typography
						type="custom-h1"
						text="Email preview"
						className="text-4xl font-medium text-gray-700"
					/>

					<XMarkIcon
						className="w-[20px] cursor-pointer"
						onClick={() => hide()}
					/>
				</div>

				<Separator className="mb-10" />
				{parse(previewContent ?? '')}
			</Modal>
		</>
	);
};

export default EmailContentEditor;
