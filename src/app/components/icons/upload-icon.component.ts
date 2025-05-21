import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IconAttributeDirective } from './icon-attribute.directive';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'UploadIcon',
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
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="17 8 12 3 7 8" />
			<line x1="12" x2="12" y1="3" y2="15" />
		</svg>
	`,
	host: {
		'[class]': 'className()',
	},
})
export class UploadIconComponent extends IconAttributeDirective {}
