import React from 'react';

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
import ToolbarPlugin from './plugins/ToolbarPlugin';

// Nodes
import { ImageNode } from './nodes/ImageNode';

// Styles
import TextEditorDefaultTheme from './themes/DefaultTheme';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ActionsPlugin from './plugins/ActionsPlugin';

function Placeholder(): JSX.Element {
	return <div className="editor-placeholder">Enter some text...</div>;
}

const editorConfig: InitialConfigType = {
	namespace: 'SimpleTextEditor',
	// The editor theme
	theme: TextEditorDefaultTheme,
	// Handling of errors during update
	onError(error: any) {
		console.log(error);
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
	return (
		<LexicalComposer initialConfig={editorConfig}>
			<div className="editor-container">
				<ToolbarPlugin />
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
