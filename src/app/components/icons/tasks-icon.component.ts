import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'TasksIcon',
	template: `
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-square-check-big mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
			aria-hidden="true"
			data-id="element-62"
		>
			<path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"></path>
			<path d="m9 11 3 3L22 4"></path>
		</svg>
	`,
})
export class TasksIconComponent {}
