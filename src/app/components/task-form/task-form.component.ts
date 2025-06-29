import {
	AfterContentInit,
	Component,
	ContentChild,
	DestroyRef,
	ElementRef,
	inject,
	input,
	InputSignal,
	OnInit,
	output,
	OutputEmitterRef,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { BackIconComponent } from '../icons/back-icon.component';
import { TaskerInputComponent } from '../../shared/components/tasker-input/tasker-input.component';
import { RichTextEditorComponent } from '../../shared/components/rich-text-editor';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';
import {
	DropdownComponent,
	DropdownOption,
} from '../../shared/components/dropdown/dropdown.component';
import { DatePicker } from 'primeng/datepicker';
import { Card } from 'primeng/card';
import { UserService } from '../../services/user.service';
import {
	BehaviorSubject,
	finalize,
	fromEvent,
	map,
	Observable,
	of,
	shareReplay,
	switchMap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChipsComponent } from '../../shared/components/chips/chips.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiConfigService } from '../../services/ui-config.service';
import { TasksService } from '../../services/tasks.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { TaskDetail } from '../../models/task.model';
import { EditableSelectComponent } from '../../shared/components/editable-select/editable-select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'tasker-task-form',
	imports: [
		BackIconComponent,
		TaskerInputComponent,
		RichTextEditorComponent,
		FileUploadComponent,
		DropdownComponent,
		DatePicker,
		Card,
		AsyncPipe,
		ChipsComponent,
		ReactiveFormsModule,
		EditableSelectComponent,
	],
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class TaskFormComponent implements OnInit, AfterContentInit {
	private _userService = inject(UserService);
	private _uiConfigService = inject(UiConfigService);
	private _taskService = inject(TasksService);
	private _toasterService = inject(ToasterService);

	data: InputSignal<TaskDetail | undefined> = input();
	edit: InputSignal<boolean> = input(false);

	isLoadingTeamMembers = signal(false);
	isCreatingTask = signal(false);
	private loadTeamMembers$ = new BehaviorSubject<boolean>(false);
	@ContentChild('saveButton', { read: ElementRef }) buttonRef!: ElementRef;
	destroyRef = inject(DestroyRef);

	basicFormGroup: FormGroup<TaskBasicFormGroup> = new FormGroup<TaskBasicFormGroup>({
		attachments: new FormControl(),
		description: new FormControl(),
		title: new FormControl(''),
	});

	taskDetailFormGroup: FormGroup<TaskDetailFormGroup> = new FormGroup<TaskDetailFormGroup>({
		assignedTo: new FormControl(),
		dueDate: new FormControl(),
		priority: new FormControl(),
		tags: new FormControl(),
		teamMembers: new FormControl(),
	});

	tags = signal<string[]>([]);
	isTagsEditable = signal<boolean>(true);
	uploadedFiles = signal<File[]>([]);
	isPriorityEditable = signal<boolean>(false);
	memberEditable = signal<boolean>(true);
	assignedToEditable = signal<boolean>(false);

	save: OutputEmitterRef<FormData> = output();

	onTagsChange(tags: string[]) {
		this.tags.set(tags);
	}

	setPriorityEditable(edit: boolean) {
		this.isPriorityEditable.set(edit);
	}

	setMemberEditable(edit: boolean) {
		this.memberEditable.set(edit);
	}

	setAssignedToEditable(edit: boolean) {
		this.assignedToEditable.set(edit);
	}

	ngOnInit(): void {
		const task = this.data();
		if (task) {
			this.taskDetailFormGroup.patchValue({
				priority: task?.priority.capitalize(),
				tags: task?.tags,
				assignedTo: task?.assignedToName,
				dueDate: task.dueDate,
				teamMembers: task.teamMembers,
			});

			this.basicFormGroup.patchValue({
				description: task.description,
				title: task.title,
			});
		}
	}

	get isPrioritySelected() {
		return !!this.taskDetailFormGroup?.get('priority')?.value;
	}

	get isMemberSelected() {
		return !!this.taskDetailFormGroup?.get('teamMembers')?.value;
	}

	get isAssignedToSelected() {
		return !!this.taskDetailFormGroup?.get('assignedTo')?.value;
	}

	teamMembers$: Observable<DropdownOption<string>[]> = this.loadTeamMembers$.pipe(
		switchMap((shouldLoad) => {
			if (!shouldLoad) {
				return of([]);
			}

			this.isLoadingTeamMembers.set(true);
			return this._userService.getTeamMembers().pipe(
				map((options) =>
					options.map((option) => ({
						label: option.name,
						value: option.id,
						isSelected: this.data()?.assignedTo === option.id,
					})),
				),
				finalize(() => this.isLoadingTeamMembers.set(false)),
			);
		}),
		shareReplay(),
	);

	onTeamMembersDropdownOpened() {
		// Only load team members if they haven't been loaded yet
		if (!this.loadTeamMembers$.value) {
			this.loadTeamMembers$.next(true);
		}
	}

	ngAfterContentInit() {
		fromEvent(this.buttonRef?.nativeElement, 'click')
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(this.onSave.bind(this));
	}

	goBack() {
		window.history.back();
	}

	priorities$: Observable<DropdownOption<string>[]> =
		this._uiConfigService.getPriorityLabels('test_team');

	priority = {};

	onPrioritySelect(data: DropdownOption<string> | undefined) {
		if (!data) return;
		this.priority = data;
	}

	onSave() {
		const task = { ...this.basicFormGroup.value, ...this.taskDetailFormGroup.value };
		const formData = new FormData();

		formData.append('task', new Blob([JSON.stringify(task)], { type: 'application/json' }));

		if (task.attachments) {
			for (const file of task.attachments) formData.append('files', file);
		}

		this.isCreatingTask.set(true);

		this.save.emit(formData);

		// if (this.edit()) {
		// } else {
		// 	this._taskService
		// 		.createTask(formData)
		// 		.pipe(finalize(() => this.isCreatingTask.set(false)))
		// 		.subscribe({
		// 			next: () => {
		// 				// Handle successful task creation
		// 				this._toasterService.showSuccess('Task created successfully!');
		// 				this.goBack(); // Navigate back after successful creation
		// 			},
		// 			error: (error) => {
		// 				// Handle error
		// 				console.error('Error creating task', error);
		// 				this._toasterService.showError('Failed to create task. Please try again.');
		// 			},
		// 		});
		// }
	}
}

interface TaskBasicFormGroup {
	title: FormControl<string | null>;
	description: FormControl<string>;
	attachments: FormControl<File[]>;
}

interface TaskDetailFormGroup {
	dueDate: FormControl<string>;
	assignedTo: FormControl<string>;
	priority: FormControl<string>;
	tags: FormControl<string[]>;
	teamMembers: FormControl<string[]>;
}
