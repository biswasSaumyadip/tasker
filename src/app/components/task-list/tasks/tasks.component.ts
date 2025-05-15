import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { TaskerAccordionComponent } from '../../../shared/components/accordion/task-accordion.component';
import { TasksService } from '../../../services/tasks.service';
import { Observable } from 'rxjs';
import { Task } from '../../../models/task.model';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'tasker-tasks',
	imports: [Card, TaskerAccordionComponent, AsyncPipe],
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss',
})
export class TasksComponent {
	private _taskService: TasksService = inject(TasksService);
	tasks$: Observable<Task[]> = this._taskService.getTasks();
}
