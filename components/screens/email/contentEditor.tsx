import * as React from 'react';
import parse from 'html-react-parser';

import { Layout } from 'components/layout';
import SimpleTextEditor from 'components/text-editor/textEditor';
import { Typography } from 'components/common';
import clsx from 'clsx';
// import useModal from 'components/hooks/useModal';
// import { Button, Separator, Typography } from 'components/common';
// import { XMarkIcon } from '@heroicons/react/24/solid';

const EmailContentEditorScreen = (): JSX.Element => {
	const [previewContent, setPreviewContent] = React.useState<string>();
	const [isEmailContent, setIsEmailContent] = React.useState<boolean>(false);

	// const { Modal, show, hide } = useModal();
	// const { Modal: ModalRaw, show: showRaw, hide: hideRaw } = useModal();

	return (
		<>
			<Layout withHeader>
				<Typography
					type="custom-h1"
					text="Content editor for Email"
					className="text-3xl font-bold text-gray-800 mb-5"
				/>
				{/* <div className="flex flex-row items-center justify-center gap-6">
					<Button
						type="button"
						decoration="line-white"
						size="medium"
						onClick={() => show()}
						className="mb-6"
					>
						Preview HTML
					</Button>

					<Button
						type="button"
						decoration="line-primary"
						size="medium"
						onClick={() => showRaw()}
						className="mb-6"
					>
						Preview Raw
					</Button>
				</div> */}
				<div className="grid grid-cols-2 gap-x-4">
					<div className="flex flex-col w-full h-auto space-y-4">
						<div className="flex gap-x-2">
							<Typography type="link-1" text="Editor" />
						</div>
						<SimpleTextEditor
							onChange={(html: string) => {
								setPreviewContent(html);
							}}
						/>
					</div>
					<div className="flex flex-col w-full h-auto space-y-4">
						<div className="flex gap-x-2">
							<button type="button" onClick={() => setIsEmailContent(false)}>
								<Typography
									type="link-1"
									text="Preview raw content"
									className={clsx({
										'border-b-2 border-primary': !isEmailContent,
									})}
								/>
							</button>
							<button type="button" onClick={() => setIsEmailContent(true)}>
								<Typography
									type="link-1"
									text="Email preview"
									className={clsx({
										'border-b-2 border-primary': isEmailContent,
									})}
								/>
							</button>
						</div>
						<div className="border rounded-lg border-dark-40 h-full p-4">
							{isEmailContent ? parse(previewContent ?? '') : previewContent}
						</div>
					</div>
				</div>
			</Layout>

			{/* <Modal className="w-auto max-w-full">
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

			<ModalRaw className="w-auto max-w-full">
				<div className="flex flex-wrap justify-between items-center w-full">
					<Typography
						type="custom-h1"
						text="Preview raw content"
						className="text-4xl font-medium text-gray-700"
					/>

					<XMarkIcon
						className="w-[20px] cursor-pointer"
						onClick={() => hideRaw()}
					/>
				</div>

				<Separator className="mb-10" />

				<div className="flex flex-col w-full h-auto">{previewContent}</div>
			</ModalRaw> */}
		</>
	);
};

export default EmailContentEditorScreen;
