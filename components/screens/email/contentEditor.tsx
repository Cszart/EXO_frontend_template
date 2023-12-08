import * as React from 'react';
import parse from 'html-react-parser';
import { Layout } from 'components/layout';
import SimpleTextEditor from 'components/text-editor/textEditor';
import { Tabs, Typography } from 'components/common';

const EmailContentEditorScreen = (): JSX.Element => {
	const [previewContent, setPreviewContent] = React.useState<string>();
	const [currentOption, setCurrentOption] = React.useState<
		'email_content' | 'preview_content'
	>('email_content');

	return (
		<Layout withHeader>
			<Typography
				type="custom-h1"
				text="Content editor for Email"
				className="text-2xl font-bold text-gray-800 mb-5"
			/>
			<div className="grid grid-cols-2 gap-4 w-full">
				<Typography type="link-1" text="Editor" />
				<Tabs
					currentOption={currentOption}
					setCurrentOption={(value) =>
						setCurrentOption(value as 'preview_content' | 'email_content')
					}
					optionsTabs={[
						{
							label: 'Email preview',
							name: 'email_content',
						},
						{
							label: 'Preview raw content',
							name: 'preview_content',
						},
					]}
				/>
				<SimpleTextEditor
					onChange={(html: string) => {
						setPreviewContent(html);
					}}
				/>
				<div className="border rounded-lg border-dark-40 h-full p-4">
					{currentOption === 'email_content'
						? parse(previewContent ?? '')
						: previewContent}
				</div>
			</div>
		</Layout>
	);
};

export default EmailContentEditorScreen;
