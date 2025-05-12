import { Component } from '@angular/core';
import { FilterIconComponent } from '../../icons/filter-icon.component';
import { Card } from 'primeng/card';
import { AdvancedFilterIconComponent } from '../../icons/advanced-filter-icon.component';
import { DropdownModule } from 'primeng/dropdown';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';

@Component({
	selector: 'tasker-filter',
  imports: [FilterIconComponent, Card, AdvancedFilterIconComponent, DropdownModule, AutoComplete, FormsModule],
	templateUrl: './filter.component.html',
	styleUrl: './filter.component.scss',
})
export class FilterComponent {
	statuses = [
		'All', 'Active', 'Inactive', 'Deactivated', 'Finished',
	];

  status = {};

  searchStatus(event: AutoCompleteCompleteEvent) {

  }


	priorities = [
		{
			id: 1,
			name: 'All Priority',
		},
		{
			id: 2,
			name: 'High',
		},
		{
			id: 3,
			name: 'Medium',
		},
		{
			id: 4,
			name: 'Low',
		},
	];

  priority = {};

	assignees = [
		{
			id: 1,
			name: 'All Assignee',
		},
		{
			id: 2,
			name: 'Unassigned',
		},
		{
			id: 3,
			name: 'Admin User',
		},
		{
			id: 4,
			name: 'Team Member',
		},
		{
			id: 5,
			name: 'Project Manager',
		},
	];

  assignee = {};

  dueDate = {};

	dueDates = [
		{
			id: 1,
			name: 'Any Time',
		},
		{
			id: 2,
			name: 'Overdue',
		},
		{
			id: 3,
			name: 'Today',
		},
		{
			id: 4,
			name: 'This Week',
		},
		{
			id: 5,
			name: 'This Month',
		},
	];
}
