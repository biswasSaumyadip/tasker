import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { Task } from '../../../models/task.model';
import { DatePipe, NgClass } from '@angular/common';
import { CapitalizeFirstPipe } from '../../pipe/capitalize-first-pipe.pipe';
import { PriorityBadgeDirective } from '../../directives/priority-badge.directive';
import { DateColorDirective } from '../../directives/date-color.directive';
import { UtilityService } from '../../services/utility.service';
import { ChipsComponent } from '../chips/chips.component';

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
		DateColorDirective,
		NgClass,
		ChipsComponent,
	],
})
export class TaskerAccordionComponent {
	// Accordion component logic goes here
	title: InputSignal<string> = input.required();
	task: InputSignal<Task> = input.required();

	private _utilityService: UtilityService = inject(UtilityService);
	dueDateStatus = this._utilityService.getDueDateStatus;
}
