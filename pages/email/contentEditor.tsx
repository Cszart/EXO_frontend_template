import * as React from 'react';
import clsx from 'clsx';

import { Layout } from 'components/layout';

// Editor
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { TRANSFORMERS } from '@lexical/markdown';

// Plugins
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';

// Custom Plugins
import {
	CodeHighlightPlugin,
	MATCHERS,
} from 'components/lexicalEditor/plugins';
import ListMaxIndentLevelPlugin from 'components/lexicalEditor/plugins/listMaxIndentLevelPlugin';

// Lexical Nodes
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';

import LexicalTheme from '../../const/lexicaltheme';

import { Typography } from 'components/form';
import { LineBreakNode } from 'lexical';
import ToolbarPlugin from 'components/lexicalEditor/plugins/toolbarPlugin';
import { ImageNode } from 'components/lexicalEditor/nodes/ImageNode';
import ImagesPlugin from 'components/lexicalEditor/plugins/imagesPlugin';
import { $generateHtmlFromNodes } from '@lexical/html';

/// Helpers config
const EditorPlaceholder = (): JSX.Element => {
	return <div className="editor-placeholder">Write your content here ... </div>;
};

function onError(error: any): void {
	console.error(error);
}

/// Configuration
const editorConfig = {
	namespace: 'EmailEditor',
	// The editor theme
	theme: LexicalTheme,
	// Handling of errors during update
	onError: onError,
	// Any custom nodes go here
	nodes: [
		HeadingNode,
		ListNode,
		ListItemNode,
		QuoteNode,
		CodeNode,
		CodeHighlightNode,
		AutoLinkNode,
		LinkNode,
		LineBreakNode,
		ImageNode,
	],
};

const EmailContentEditor = (): any => {
	const [editorState, setEditorState] = React.useState<any>();

	const onChange = (editorState: any): void => {
		setEditorState(editorState);
	};

	React.useEffect(() => {
		console.log('\n\n<- OnChange Editor ->', editorState);
	}, [editorState]);

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

			<LexicalComposer initialConfig={editorConfig}>
				<div className="editor-container">
					<ToolbarPlugin />
					<div className="editor-inner">
						<RichTextPlugin
							contentEditable={<ContentEditable className="editor-input" />}
							placeholder={<EditorPlaceholder />}
							ErrorBoundary={LexicalErrorBoundary}
						/>
						<HistoryPlugin />
						<AutoFocusPlugin />
						<CodeHighlightPlugin />
						<ListPlugin />
						<LinkPlugin />
						<ListMaxIndentLevelPlugin maxDepth={7} />
						<MarkdownShortcutPlugin transformers={TRANSFORMERS} />
						<CheckListPlugin />
						<AutoLinkPlugin matchers={MATCHERS} />
						<TabIndentationPlugin />
						<ImagesPlugin />
						<OnChangePlugin onChange={onChange} />
					</div>
				</div>
			</LexicalComposer>
		</Layout>
	);
};

export default EmailContentEditor;
