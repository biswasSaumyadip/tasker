import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { TaskerAccordionComponent } from '../../../shared/components/accordion/task-accordion.component';
import { TasksService } from '../../../services/tasks.service';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { TaskWithChildren } from '../../../models/task.model';
import { AsyncPipe } from '@angular/common';
import { ToasterService } from '../../../shared/services/toaster.service';
import { Router } from '@angular/router';

@Component({
	selector: 'tasker-tasks',
	imports: [Card, TaskerAccordionComponent, AsyncPipe],
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss',
})
export class TasksComponent {
	private _taskService: TasksService = inject(TasksService);
	private _toasterService: ToasterService = inject(ToasterService);
	private _triggerGetTask = new Subject<void>();
	private _router = inject(Router);
	tasks$: Observable<TaskWithChildren[]> = this._triggerGetTask.pipe(
		startWith(void 0),
		switchMap(() => this._taskService.getTasks()),
	);
	private _id: string | undefined;

	delete(id: string) {
		this._taskService.deleteTask(id).subscribe((resp) => {
			if (resp.status === 'DELETED') {
				this._toasterService.showSuccess(resp.message);
				this._triggerGetTask.next();
			} else {
				this._toasterService.showError(resp.message);
			}
		});
	}

	edited(id: string) {
		this._id = id;
		this._router.navigateByUrl(`tasks/edit/${id}`);
	}
}
