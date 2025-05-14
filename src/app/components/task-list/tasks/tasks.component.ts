import { Component } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
	selector: 'tasker-tasks',
	imports: [Card],
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss',
})
export class TasksComponent {}
