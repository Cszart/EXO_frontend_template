import { LexicalCommand, createCommand } from 'lexical';

export const INDENT_CONTENT_COMMAND: LexicalCommand<void> = createCommand(
	'INDENT_CONTENT_COMMAND'
);
export const OUTDENT_CONTENT_COMMAND: LexicalCommand<void> = createCommand(
	'OUTDENT_CONTENT_COMMAND'
);
