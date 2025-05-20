import {
	ChangeDetectionStrategy,
	Component,
	input,
	InputSignal,
	ViewEncapsulation,
} from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'BackIcon',
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
			<path d="m12 19-7-7 7-7"></path>
			<path d="M19 12H5"></path>
		</svg>
	`,
	host: {
		'[class]': 'className()',
	},
})
export class BackIconComponent {
	// Input properties with default values
	size: InputSignal<string> = input('24');
	fill: InputSignal<string> = input('none');
	stroke: InputSignal<string> = input('currentColor');
	strokeWidth: InputSignal<string> = input('2');
	className: InputSignal<string> = input('');
	svgStyle: InputSignal<string> = input('');
}
