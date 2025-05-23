import { Component } from '@angular/core';
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
	],
	templateUrl: './task-create.component.html',
	styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent {
	goBack() {
		window.history.back();
	}

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

	onPrioritySelect(data: DropdownOption<string> | undefined) {
		if (!data) return;
		this.priority = data;
	}
}
