import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FilterComponent } from './filter/filter.component';

@Component({
	selector: 'tasker-task-list',
	imports: [Button, AnalyticsComponent, FilterComponent],
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss',
})
export class TaskListComponent {}
