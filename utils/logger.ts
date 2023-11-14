import React from 'react';

/**
 * A simple logger component for logging messages with different log levels.
 *
 * @param {string} identifier - The identifier for the logger.
 * @example
 * const logger = new Logger({ identifier: "Example" });
 * logger.info("example info");
 */
interface LoggerProps {
	identifier: string;
}

class Logger extends React.Component<LoggerProps> {
	/**
	 * Creates a new Logger with the specified identifier.
	 * @param {string} identifier - The identifier for the logger.
	 */
	constructor(props: LoggerProps) {
		super(props);
	}

	/**
	 * Logs an info message with the specified arguments.
	 * @param  {...any} args - The arguments to be logged.
	 * @returns {void}
	 */
	info(...args: any[]): void {
		console.log(`<- [INFO] ${this.props.identifier} :`, ...args);
	}

	/**
	 * Logs a warning message with the specified arguments.
	 * @param  {...any} args - The arguments to be logged.
	 * @returns {void}
	 */
	warning(...args: any[]): void {
		console.log(`<- [WARNING] ${this.props.identifier} :`, ...args);
	}

	/**
	 * Logs an error message with the specified arguments.
	 * @param  {...any} args - The arguments to be logged.
	 * @returns {void}
	 */
	error(...args: any[]): void {
		console.log(`<- [ERROR] ${this.props.identifier} :`, ...args);
	}

	render(): null {
		return null; // Since this is a utility component, it doesn't need to render anything
	}
}

export default Logger;
