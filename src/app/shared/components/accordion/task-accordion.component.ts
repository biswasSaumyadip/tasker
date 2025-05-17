import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	InputSignal,
	OnDestroy,
	OnInit,
	signal,
} from '@angular/core';
import { TaskWithChildren } from '../../../models/task.model';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { CapitalizeFirstPipe } from '../../pipe/capitalize-first-pipe.pipe';
import { PriorityBadgeDirective } from '../../directives/priority-badge.directive';
import { DateColorDirective } from '../../directives/date-color.directive';
import { UtilityService } from '../../services/utility.service';
import { ChipsComponent } from '../chips/chips.component';
import { FormsModule } from '@angular/forms';
import { CheckIconComponent } from '../../../components/icons/check-icon.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EditIconComponent } from '../../../components/icons/edit-icon.component';
import { TrashIconComponent } from '../../../components/icons/trash-icon.component';

@Component({
	selector: 'tasker-accordion',
	standalone: true,
	templateUrl: './task-accordion.component.html',
	styleUrls: ['./task-accordion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		DatePipe,
		AsyncPipe,
		CapitalizeFirstPipe,
		PriorityBadgeDirective,
		DateColorDirective,
		NgClass,
		ChipsComponent,
		FormsModule,
		CheckIconComponent,
		EditIconComponent,
		TrashIconComponent,
	],
})
export class TaskerAccordionComponent implements OnInit, OnDestroy {
	// Accordion component logic goes here
	title: InputSignal<string> = input.required();
	task: InputSignal<TaskWithChildren> = input.required();

	// Track expanded state
	isExpanded = signal<boolean>(false);

	private _utilityService: UtilityService = inject(UtilityService);
	dueDateStatus = this._utilityService.getDueDateStatus;

	// Reactive approach for checkbox state
	private isCompletedSubject = new BehaviorSubject<boolean>(false);
	isCompleted$: Observable<boolean> = this.isCompletedSubject.asObservable();

	// Reactive approach for hover state
	private isHoveredSubject = new BehaviorSubject<boolean>(false);
	isHovered$: Observable<boolean> = this.isHoveredSubject.asObservable();

	// For two-way binding compatibility
	get isCompleted(): boolean {
		return this.isCompletedSubject.value;
	}

	// For cleanup
	private destroy$ = new Subject<void>();

	ngOnInit(): void {
		this.isCompletedSubject.next(this.task().completed);
	}

	toggleTask(): void {
		const newCompletedState = !this.isCompleted;
		this.isCompletedSubject.next(newCompletedState);
	}

	toggleExpand(): void {
		this.isExpanded.update((state) => !state);
	}

	hasChildren(): boolean {
		return !!this.task().children && this.task().children!.length > 0;
	}

	// Methods to handle hover state
	onMouseEnter(): void {
		this.isHoveredSubject.next(true);
	}

	onMouseLeave(): void {
		this.isHoveredSubject.next(false);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
