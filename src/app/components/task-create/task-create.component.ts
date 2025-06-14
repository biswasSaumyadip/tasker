import { Component, inject, signal } from '@angular/core';
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
import { BehaviorSubject, finalize, map, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChipsComponent } from '../../shared/components/chips/chips.component';
import { Button } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiConfigService } from '../../services/ui-config.service';
import { TasksService } from '../../services/tasks.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ToasterService } from '../../shared/services/toaster.service';

@Component({
	selector: 'tasker-task-create',
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
		Button,
		ReactiveFormsModule,
		SpinnerComponent,
	],
	templateUrl: './task-create.component.html',
	styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent {
	private _userService = inject(UserService);
	private _uiConfigService = inject(UiConfigService);
	private _taskService = inject(TasksService);
	private _toasterService = inject(ToasterService);

	isLoadingTeamMembers = signal(false);
	isCreatingTask = signal(false);
	private loadTeamMembers$ = new BehaviorSubject<boolean>(false);

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

	onTagsChange(tags: string[]) {
		this.tags.set(tags);
	}

	teamMembers$: Observable<DropdownOption<string>[]> = this.loadTeamMembers$.pipe(
		switchMap((shouldLoad) => {
			if (!shouldLoad) {
				return of([]);
			}

			this.isLoadingTeamMembers.set(true);
			return this._userService.getTeamMembers().pipe(
				map((options) => options.map((option) => ({ label: option.name, value: option.id }))),
				finalize(() => this.isLoadingTeamMembers.set(false)),
			);
		}),
	);

	onTeamMembersDropdownOpened() {
		// Only load team members if they haven't been loaded yet
		if (!this.loadTeamMembers$.value) {
			this.loadTeamMembers$.next(true);
		}
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
		this._taskService
			.createTask(formData)
			.pipe(finalize(() => this.isCreatingTask.set(false)))
			.subscribe({
				next: (response) => {
					// Handle successful task creation
					console.log('Task created successfully', response);
					this._toasterService.showSuccess('Task created successfully!');
					this.goBack(); // Navigate back after successful creation
				},
				error: (error) => {
					// Handle error
					console.error('Error creating task', error);
					this._toasterService.showError('Failed to create task. Please try again.');
				},
			});
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
