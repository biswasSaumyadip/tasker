import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TestBed } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
	let pipe: SafeHtmlPipe;
	let sanitizer: DomSanitizer;

	beforeEach(() => {
		TestBed.configureTestingModule({});

		sanitizer = TestBed.inject(DomSanitizer);

		pipe = new SafeHtmlPipe(sanitizer);
	});

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should delegate the sanitization to DomSanitizer.bypassSecurityTrustHtml', () => {
		const sanitizerSpy = spyOn(sanitizer, 'bypassSecurityTrustHtml').and.callThrough();
		const unsafeHtmlString = '<p>This is some test HTML.</p>';

		// Act: Call the pipe's transform method.
		pipe.transform(unsafeHtmlString);

		expect(sanitizerSpy).toHaveBeenCalledWith(unsafeHtmlString);
	});

	it('should return a SafeHtml object', () => {
		// Arrange
		const unsafeHtmlString = '<strong>Test</strong>';

		// Act
		const result = pipe.transform(unsafeHtmlString);

		expect(result).not.toBe(unsafeHtmlString);
		expect(typeof result).toBe('object');

		const expectedResult = sanitizer.bypassSecurityTrustHtml(unsafeHtmlString);
		expect(result.constructor.name).toEqual(expectedResult.constructor.name);
	});
});
