import { Component } from '@angular/core';
import {Button} from 'primeng/button';

@Component({
	selector: 'tasker-task-list',
  imports: [
    Button
  ],
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss',
})
export class TaskListComponent {}
