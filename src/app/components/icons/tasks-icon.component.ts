import {
	ChangeDetectionStrategy,
	Component,
	input,
	InputSignal,
	ViewEncapsulation,
} from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'TasksIcon',
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
			data-id="element-62"
		>
			<path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"></path>
			<path d="m9 11 3 3L22 4"></path>
		</svg>
	`,
})
export class TasksIconComponent {
	// Input properties with default values
	size: InputSignal<string> = input('24');
	fill: InputSignal<string> = input('none');
	stroke: InputSignal<string> = input('currentColor');
	strokeWidth: InputSignal<string> = input('2');
	className: InputSignal<string> = input(
		'lucide lucide-square-check-big mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500',
	);
}
