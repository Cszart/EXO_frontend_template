import * as React from 'react';
import parse from 'html-react-parser';
import { saveAs } from 'file-saver';

import { Layout } from 'components/layout';
import { Button, Tabs, Typography } from 'components/common';
import { useRouter } from 'next/router';
import { EmailTemplateI } from 'interfaces';
import Icons from 'const/icons';
import SimpleTextEditor from 'components/text-editor/textEditor';

const saveHtmlToFile = (htmlContent: string, fileName: string): void => {
	const blob = new Blob([htmlContent], { type: 'text/html' });
	saveAs(blob, fileName);
};

const EmailContentEditorScreen = (): JSX.Element => {
	// Utils
	const router = useRouter();
	const { editMode } = router.query;

	const [currentOption, setCurrentOption] = React.useState<
		'email_content' | 'preview_content'
	>('email_content');

	// Data
	const [previewContent, setPreviewContent] = React.useState<string>();
	const [defaultHtml, setDefaultHtml] = React.useState<string | undefined>(
		undefined
	);

	React.useEffect(() => {
		if (editMode === 'true') {
			// Retrieve the JSON object from local storage
			const stringTemplateToEdit = localStorage.getItem('templateToEdit');

			if (stringTemplateToEdit) {
				// Use the JSON object as needed
				const templateToEditContent: EmailTemplateI =
					JSON.parse(stringTemplateToEdit);
				setPreviewContent(templateToEditContent.content);
				setDefaultHtml(templateToEditContent.content);
			}
		}
	}, [editMode]);

	return (
		<Layout withHeader title="Content editor for Email">
			{/* Download HTML button */}
			<div className="flex w-full justify-end mb-10">
				<Button
					label="Download"
					decoration="not-fill"
					size="extra-small"
					iconRight
					icon={Icons.download}
					className="rounded-[32px]"
					onClick={() => saveHtmlToFile(previewContent ?? '', 'template.html')}
				/>
			</div>

			{/* Page content - Two columns */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
				{/* First column - Editor */}
				<div className="flex flex-col gap-2 w-full">
					<Typography type="link-1" text="Editor" className="mb-2 text-left" />

					<SimpleTextEditor
						onChange={(html: string) => {
							setPreviewContent(html);
						}}
						defaultHtml={defaultHtml}
					/>
				</div>

				{/* Second column - Preview and actions */}
				<div className="flex flex-col gap-2 w-full">
					{/* Option bar */}
					<div className="flex flex-wrap items-center justify-between gap-4 w-full">
						{/* Tabs */}
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
					</div>

					<div className="border rounded-lg border-dark-40 h-full min-h-[400px] p-4">
						{currentOption === 'email_content'
							? parse(previewContent ?? '')
							: previewContent}
					</div>
				</div>
			</div>

			{/* Save button */}
			<div className="flex w-full justify-end lg:mt-10">
				<Button
					label="Save changes"
					decoration="line-primary"
					size="extra-small"
					onClick={() => {
						alert('Changes Saved!');
					}}
				/>
			</div>
		</Layout>
	);
};

export default EmailContentEditorScreen;
