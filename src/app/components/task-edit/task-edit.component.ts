import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TasksService } from '../../services/tasks.service';
import { finalize, Observable, switchMap } from 'rxjs';
import { TaskDetail } from '../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ToasterService } from '../../shared/services/toaster.service';
import { Button } from 'primeng/button';
import { SpinnerComponent } from '../../shared/components/spinner';

@Component({
	selector: 'tasker-edit-task',
	template: ` @let task = task$ | async;
		@if (task) {
			<tasker-task-form [data]="task" (save)="save($event)">
				<div save>
					<h1 class="tasker__form--title">Edit task</h1>
					<p-button
						#saveButton
						[label]="isEditingTask() ? '' : 'Save'"
						styleClass="p-button-primary tasker__button"
						[style]="{ height: '38px', 'font-weight': '500', 'font-size': '12px' }"
						class="mt-4 w-full"
						[disabled]="isEditingTask()"
					>
						@if (isEditingTask()) {
							<tasker-spinner [size]="20" colorClass="text-white"></tasker-spinner>
						}
					</p-button>
				</div>
			</tasker-task-form>
		}`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TaskFormComponent, AsyncPipe, Button, SpinnerComponent],
})
export class TaskEditComponent {
	private _taskService: TasksService = inject(TasksService);
	private _toasterService = inject(ToasterService);
	private route = inject(ActivatedRoute);
	isEditingTask = signal(false);
	task$: Observable<TaskDetail> = this.route.paramMap.pipe(
		switchMap((param) => this._taskService.getTask(param.get('id')!)),
	);

	goBack() {
		window.history.back();
	}

	save(formData: FormData) {
		this.isEditingTask.set(true);
		this.route.paramMap
			.pipe(
				switchMap((params) => {
					const id = params.get('id')!;
					return this._taskService.updateTask(formData, id);
				}),
				finalize(() => this.isEditingTask.set(false)),
			)
			.subscribe({
				next: () => {
					// Handle successful task creation
					this._toasterService.showSuccess('Task updated successfully!');
					this.goBack(); // Navigate back after successful creation
				},
				error: (error) => {
					// Handle error
					console.error('Error editing task', error);
					this._toasterService.showError('Failed to edit task. Please try again.');
				},
			});
	}
}
