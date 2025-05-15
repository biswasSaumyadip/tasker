import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Task } from '../../../models/task.model';
import { DatePipe } from '@angular/common';
import { CapitalizeFirstPipe } from '../../pipe/capitalize-first-pipe.pipe';
import { PriorityBadgeDirective } from '../../directives/priority-badge.directive';

@Component({
	selector: 'tasker-accordion',
	standalone: true,
	templateUrl: './task-accordion.component.html',
	styleUrls: ['./task-accordion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		DatePipe,
		CapitalizeFirstPipe,
		PriorityBadgeDirective,
		// Add any necessary imports here
	],
})
export class TaskerAccordionComponent {
	// Accordion component logic goes here
	title: InputSignal<string> = input.required();
	task: InputSignal<Task> = input.required();
}
