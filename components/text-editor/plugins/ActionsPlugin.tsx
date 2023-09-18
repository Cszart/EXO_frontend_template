import { $createCodeNode, $isCodeNode } from '@lexical/code';
import {
	$convertFromMarkdownString,
	$convertToMarkdownString,
} from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, $getRoot } from 'lexical';
import * as React from 'react';
import { useCallback } from 'react';
import { PLAYGROUND_TRANSFORMERS } from '../utils/MarkdownTransformers';

export default function ActionsPlugin(): JSX.Element {
	const [editor] = useLexicalComposerContext();

	const handleMarkdownToggle = useCallback(() => {
		editor.update(() => {
			const root = $getRoot();
			const firstChild = root.getFirstChild();
			if ($isCodeNode(firstChild) && firstChild.getLanguage() === 'markdown') {
				$convertFromMarkdownString(
					firstChild.getTextContent(),
					PLAYGROUND_TRANSFORMERS
				);
			} else {
				const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
				root
					.clear()
					.append(
						$createCodeNode('markdown').append($createTextNode(markdown))
					);
			}
			root.selectEnd();
		});
	}, [editor]);

	return (
		<div className="actions flex flex-row flex-wrap items-center justify-end">
			<button
				className="action-button p-1 rounded-full border border-gray-700"
				onClick={handleMarkdownToggle}
				title="Convert From Markdown"
				aria-label="Convert from markdown"
			>
				<i className="markdown" />
			</button>
		</div>
	);
}
