import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'tasker-accordion',
	standalone: true,
	templateUrl: './task-accordion.component.html',
	styleUrls: ['./task-accordion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		// Add any necessary imports here
	],
})
export class TaskerAccordionComponent {
	// Accordion component logic goes here
}
