import React, { useState } from 'react';

// Lexical
import { $generateHtmlFromNodes } from '@lexical/html';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';

// Lexical plugins
import {
	InitialConfigType,
	LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

// Custom plugins
import ImagesPlugin from './plugins/ImagesPlugin';
import SetDefaultValuePlugin from './plugins/SetDefaultValuePlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ActionsPlugin from './plugins/ActionsPlugin';

// Nodes
import { ImageNode } from './nodes/Image/ImageNode';

// Styles
import TextEditorDefaultTheme from './themes/DefaultTheme';
import {
	AutoLinkPlugin,
	createLinkMatcherWithRegExp,
} from '@lexical/react/LexicalAutoLinkPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin/ToolbarPlugin';

// Const
// For Auto Link
const URL_REGEX =
	/((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_REGEX =
	/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const MATCHERS = [
	createLinkMatcherWithRegExp(URL_REGEX, (text) => {
		return text.startsWith('http') ? text : `https://${text}`;
	}),
	createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
		return `mailto:${text}`;
	}),
];

function Placeholder(): JSX.Element {
	return <div className="editor-placeholder">Enter some text...</div>;
}

const editorConfig: InitialConfigType = {
	namespace: 'SimpleTextEditor',
	// The editor theme
	theme: TextEditorDefaultTheme,
	// Handling of errors during update
	onError(error: any) {
		console.log('<- [TextEditor] error: ', error);
		throw error;
	},
	// Any custom nodes go here
	nodes: [
		HeadingNode,
		ListNode,
		ListItemNode,
		QuoteNode,
		CodeNode,
		CodeHighlightNode,
		TableNode,
		TableCellNode,
		TableRowNode,
		AutoLinkNode,
		LinkNode,
		ImageNode,
	],
};

export interface SimpleTextEditorProps {
	onChange: (editorState: string) => void;
	defaultHtml?: string;
}

const SimpleTextEditor = (props: SimpleTextEditorProps): JSX.Element => {
	const [, setIsLinkEditMode] = useState(false);

	return (
		<LexicalComposer initialConfig={editorConfig}>
			<div className="editor-container">
				<ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />

				<div className="editor-inner">
					<RichTextPlugin
						contentEditable={<ContentEditable className="editor-input" />}
						placeholder={<Placeholder />}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<OnChangePlugin
						onChange={async (editorState, editor) => {
							props.onChange(
								editorState.read(() => {
									return $generateHtmlFromNodes(editor, null);
								})
							);
						}}
						ignoreSelectionChange
					/>
					<AutoFocusPlugin />
					<HistoryPlugin />
					<LinkPlugin />
					<ListPlugin />
					<MarkdownShortcutPlugin transformers={TRANSFORMERS} />

					<AutoLinkPlugin matchers={MATCHERS} />
					<CodeHighlightPlugin />
					<ImagesPlugin />
				</div>
				<SetDefaultValuePlugin html={props.defaultHtml} />
				<ActionsPlugin />
			</div>
		</LexicalComposer>
	);
};

export default SimpleTextEditor;
