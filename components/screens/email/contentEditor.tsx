import * as React from 'react';
import parse from 'html-react-parser';
import { saveAs } from 'file-saver';

import { Layout } from 'components/layout';
import SimpleTextEditor from 'components/text-editor/textEditor';
import { Button, Tabs, Typography } from 'components/common';
import { emailService } from 'api_services/email';
import { useRouter } from 'next/router';
import { EmailTemplate } from 'interfaces';

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
				const templateToEditContent: EmailTemplate =
					JSON.parse(stringTemplateToEdit);
				setPreviewContent(templateToEditContent.content);
				setDefaultHtml(templateToEditContent.content);
			}
		}
	}, [editMode]);

	return (
		<Layout withHeader>
			<Typography
				type="custom-h1"
				text="Content editor for Email"
				className="text-2xl font-bold text-gray-800 mb-5"
			/>

			{/* Page content - Two columns */}
			<div className="grid grid-cols-2 gap-4 w-full">
				{/* First column - Editor */}
				<div className="flex flex-col gap-2 w-full">
					<Typography type="link-1" text="Editor" />

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

						{/* Actions buttons */}
						<div className="flex flex-wrap gap-2">
							<Button
								label="Download"
								decoration="fill"
								size="extra-small"
								onClick={() =>
									saveHtmlToFile(previewContent ?? '', 'template.html')
								}
							/>
							<Button
								label="Save"
								decoration="line-primary"
								size="extra-small"
								onClick={() =>
									previewContent && emailService.saveTemplate(previewContent)
								}
							/>
						</div>
					</div>

					<div className="border rounded-lg border-dark-40 h-full p-4">
						{currentOption === 'email_content'
							? parse(previewContent ?? '')
							: previewContent}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default EmailContentEditorScreen;
