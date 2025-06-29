// string.extensions.d.ts

export {}; // should be a module, using export make this file not global so it won't collide with the library files

declare global {
	interface String {
		capitalize(): string;
	}
}
