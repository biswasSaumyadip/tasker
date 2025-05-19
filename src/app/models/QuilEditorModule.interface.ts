export interface QuillModules {
	/**
	 * Toolbar module config.
	 * Can be an array of controls, a selector, or an object with a container.
	 */
	toolbar?: Array<any> | string | { container: Array<any> | string };

	/**
	 * Clipboard module config.
	 */
	clipboard?: {
		matchVisual?: boolean;
	};

	/**
	 * History module config.
	 */
	history?: {
		delay?: number;
		maxStack?: number;
		userOnly?: boolean;
	};

	/**
	 * Syntax highlighting (requires highlight.js)
	 */
	syntax?: boolean;

	/**
	 * Any custom modules you might register.
	 */
	[key: string]: any;
}
