import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IconAttributeDirective } from './icon-attribute.directive';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'UpDownArrowIcon',
	standalone: true,
	encapsulation: ViewEncapsulation.None,
	template: `
		<svg
			xmlns="http://www.w3.org/2000/svg"
			[attr.width]="size()"
			[attr.height]="size()"
			viewBox="0 0 24 24"
			[attr.fill]="fill()"
			[attr.stroke]="stroke()"
			[attr.stroke-width]="strokeWidth()"
			stroke-linecap="round"
			stroke-linejoin="round"
			[class]="className()"
			aria-hidden="true"
		>
			<path d="m21 16-4 4-4-4" />
			<path d="M17 20V4" />
			<path d="m3 8 4-4 4 4" />
			<path d="M7 4v16" />
		</svg>
	`,
	host: {
		'[class]': 'className()',
	},
})
export class UpDownArrowIconComponent extends IconAttributeDirective {}
