import { Component } from '@angular/core';
import { FilterIconComponent } from '../../icons/filter-icon.component';
import { Card } from 'primeng/card';
import { AdvancedFilterIconComponent } from '../../icons/advanced-filter-icon.component';
import { DropdownModule } from 'primeng/dropdown';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import {
	DropdownComponent,
	DropdownOption,
} from '../../../shared/components/dropdown/dropdown.component';

@Component({
	selector: 'tasker-filter',
	imports: [
		FilterIconComponent,
		Card,
		AdvancedFilterIconComponent,
		DropdownModule,
		AutoComplete,
		FormsModule,
		DropdownComponent,
	],
	templateUrl: './filter.component.html',
	styleUrl: './filter.component.scss',
})
export class FilterComponent {
	statuses: DropdownOption<string>[] = [
		{ label: 'All Status', value: 'all' },
		{ label: 'Open', value: 'open' },
		{ label: 'In Progress', value: 'in-progress' },
		{ label: 'Completed', value: 'completed' },
	];

	status = {};

	priorities: DropdownOption<string>[] = [
		{
			label: 'All Priority',
			value: 'all',
		},
		{
			label: 'Low',
			value: 'low',
		},
		{
			label: 'Medium',
			value: 'medium',
		},
		{
			label: 'High',
			value: 'high',
		},
		{
			label: 'Urgent',
			value: 'urgent',
		},
	];

	priority = {};

	assignees: DropdownOption<string>[] = [
		{
			label: 'All Assignees',
			value: 'all',
		},
		{
			label: 'John Doe',
			value: 'john-doe',
		},
		{
			label: 'Jane Smith',
			value: 'jane-smith',
		},
		{
			label: 'Bob Johnson',
			value: 'bob-johnson',
		},
	];

	assignee = {};

	dueDate = {};

	dueDates = [
		{
			label: 'Today',
			value: 'today',
		},
		{
			label: 'Tomorrow',
			value: 'tomorrow',
		},
		{
			label: 'This Week',
			value: 'this-week',
		},
		{
			label: 'Next Week',
			value: 'next-week',
		},
		{
			label: 'This Month',
			value: 'this-month',
		},
	];

	onStatusSelect(data: DropdownOption<string> | undefined) {
		if (!data) return;
		this.status = data;
	}

	onPrioritySelect(data: DropdownOption<string> | undefined) {
		if (!data) return;
		this.priority = data;
	}

	onAssigneeSelect(data: DropdownOption<string> | undefined) {
		if (!data) return;
		this.assignee = data;
	}

	onDueDateSelect(data: DropdownOption<string> | undefined) {
		if (!data) return;
		this.dueDate = data;
	}
}
