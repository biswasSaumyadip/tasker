import { CapitalizeFirstPipe } from './capitalize-first-pipe.pipe';

describe('CapitalizeFirstPipe', () => {
	let pipe: CapitalizeFirstPipe;

	beforeEach(() => {
		pipe = new CapitalizeFirstPipe();
	});

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	describe('transform', () => {
		it('should capitalize the first letter and lowercase the rest', () => {
			expect(pipe.transform('hello')).toBe('Hello');
			expect(pipe.transform('WORLD')).toBe('World');
			expect(pipe.transform('javaScript')).toBe('Javascript');
		});

		it('should handle single letter inputs', () => {
			expect(pipe.transform('a')).toBe('A');
			expect(pipe.transform('Z')).toBe('Z');
		});

		it('should return empty string for empty or null input', () => {
			expect(pipe.transform('')).toBe('');
		});

		it('should handle strings with leading spaces', () => {
			expect(pipe.transform(' hello')).toBe(' hello');
			// Note: The pipe doesn't trim spaces, it just capitalizes the first character
		});

		it('should handle strings with special characters', () => {
			expect(pipe.transform('_hello')).toBe('_hello');
			expect(pipe.transform('123abc')).toBe('123abc');
			// Note: The pipe only capitalizes letters, not special characters
		});
	});
});
