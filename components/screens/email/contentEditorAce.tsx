import { Button, Typography } from 'components/common';
import { Layout } from 'components/layout';
import Icons from 'const/icons';
import saveAs from 'file-saver';
import { EmailTemplate } from 'interfaces';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

import React from 'react';
import { emailService } from 'api_services';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

// Save HTML function
const saveHtmlToFile = (htmlContent: string, fileName: string): void => {
	const blob = new Blob([htmlContent], { type: 'text/html' });
	saveAs(blob, fileName);
};

// Main component
const EmailContentEditorAceScreen = (): JSX.Element => {
	// Utils
	const router = useRouter();
	const { editMode } = router.query;

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
					<Typography type="link-1" text="Editor" className="mb-2" />

					<AceEditor
						className="editor"
						name="html-editor"
						style={{ width: '100%', height: '100%' }}
						mode="html"
						onChange={(html) => setPreviewContent(html)}
						width="auto"
						placeholder={'Start coding'}
						theme="monokai"
						value={previewContent}
						defaultValue={defaultHtml}
						editorProps={{ $blockScrolling: true }}
						setOptions={{
							enableBasicAutocompletion: true,
							enableLiveAutocompletion: true,
							enableSnippets: true,
						}}
					/>
				</div>

				{/* Second column - Preview */}
				<div className="border rounded-lg border-dark-40 h-full min-h-[400px] p-4">
					{previewContent && parse(previewContent)}
				</div>
			</div>

			{/* Save button */}
			<div className="flex w-full justify-end mt-10">
				<Button
					label="Save changes"
					decoration="line-primary"
					size="extra-small"
					onClick={() =>
						previewContent && emailService.saveTemplate(previewContent)
					}
				/>
			</div>
		</Layout>
	);
};

export default EmailContentEditorAceScreen;
