import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TreeView } from '@lexical/react/LexicalTreeView';

export default function DebugConsole(): JSX.Element {
	return (
		<TreeView
			viewClassName="tree-view-output"
			timeTravelPanelClassName="debug-timetravel-panel"
			timeTravelButtonClassName="debug-timetravel-button"
			timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
			timeTravelPanelButtonClassName="debug-timetravel-panel-button"
			treeTypeButtonClassName=""
			editor={useLexicalComposerContext()[0]}
		/>
	);
}
