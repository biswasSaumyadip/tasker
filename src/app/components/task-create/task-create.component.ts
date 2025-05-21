import { Component } from '@angular/core';
import { BackIconComponent } from '../icons/back-icon.component';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { TaskerInputComponent } from '../../shared/components/tasker-input/tasker-input.component';
import { RichTextEditorComponent } from '../../shared/components/rich-text-editor';
import { FileUploadComponent } from '../../shared/components/file-upload/file-upload.component';

@Component({
	selector: 'tasker-task-create',
	imports: [
		BackIconComponent,
		Accordion,
		AccordionPanel,
		AccordionHeader,
		AccordionContent,
		TaskerInputComponent,
		RichTextEditorComponent,
		FileUploadComponent,
	],
	templateUrl: './task-create.component.html',
	styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent {
	goBack() {
		window.history.back();
	}
}
