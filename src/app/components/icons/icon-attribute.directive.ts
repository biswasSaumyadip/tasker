import { Directive, input, InputSignal } from '@angular/core';

@Directive()
export abstract class IconAttributeDirective {
	size: InputSignal<string> = input('24');
	fill: InputSignal<string> = input('none');
	stroke: InputSignal<string> = input('currentColor');
	strokeWidth: InputSignal<string> = input('2');
	className: InputSignal<string> = input('');
}
