import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { SpinnerComponent } from '../../shared/components/spinner';
import { TaskFormComponent } from '../task-form/task-form.component';
import { finalize } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { ToasterService } from '../../shared/services/toaster.service';

@Component({
	selector: 'tasker-task-add',
	template: `
		<tasker-task-form (save)="save($event)">
			<div save>
				<h1 class="tasker__form--title">Create task</h1>
				<p-button
					#saveButton
					[label]="isCreatingTask() ? '' : 'Save'"
					styleClass="p-button-primary tasker__button"
					[style]="{ height: '38px', 'font-weight': '500', 'font-size': '12px' }"
					class="mt-4 w-full"
					[disabled]="isCreatingTask()"
				>
					@if (isCreatingTask()) {
						<tasker-spinner [size]="20" colorClass="text-white"></tasker-spinner>
					}
				</p-button>
			</div>
		</tasker-task-form>
	`,
	imports: [Button, SpinnerComponent, TaskFormComponent],
})
export class TaskAddComponent {
	private _taskService: TasksService = inject(TasksService);
	private _toasterService: ToasterService = inject(ToasterService);

	goBack() {
		window.history.back();
	}

	isCreatingTask = signal(false);

	save(formData: FormData) {
		this._taskService
			.createTask(formData)
			.pipe(finalize(() => this.isCreatingTask.set(false)))
			.subscribe({
				next: () => {
					// Handle successful task creation
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
