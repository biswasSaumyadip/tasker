import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
	selector: 'tasker-spinner',
	standalone: true,
	template: `
		<svg
			[ngClass]="colorClass()"
			[attr.width]="size() + 'px'"
			[attr.height]="size() + 'px'"
			class="animate-spin"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				class="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				stroke-width="4"
			></circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	`,
	styleUrls: ['./spinner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgClass],
})
export class SpinnerComponent {
	/**
	 * Size of the spinner in pixels
	 * Default: 24px (h-6 w-6)
	 */
	size: InputSignal<number> = input(24);

	/**
	 * Color class to apply to the spinner
	 * Default: 'text-indigo-600'
	 */
	colorClass: InputSignal<string> = input('text-indigo-600');
}
