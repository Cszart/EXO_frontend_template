import * as React from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

import { Layout } from 'components/layout';

// Editor
import { EditorState } from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor_ws = dynamic<EditorProps>(
	() => import('react-draft-wysiwyg').then((mod) => mod.Editor as any),
	{ ssr: false }
);

import { Typography } from 'components/form';

const EmailContentEditor = (): any => {
	const [editorState, setEditorState] = React.useState<EditorState>(
		EditorState.createEmpty()
	);

	const onEditorStateChange = (currentEditorState: EditorState): void => {
		console.log('\n\n<- Editor, current editor state ->', currentEditorState);
		setEditorState(currentEditorState);
	};

	const toolbarOptions = {
		colorPicker: {
			colors: [
				'rgb(0, 0, 0)',
				'rgb(255, 0, 0)',
				'rgb(0, 255, 0)',
				'rgb(0, 0, 255)',
			],
		},
	};

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

			<Editor_ws
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
				toolbar={toolbarOptions}
				wrapperClassName="h-full w-[90%]"
				editorClassName="bg-white px-6 pt-4 pb-2"
			/>
		</Layout>
	);
};

export default EmailContentEditor;
