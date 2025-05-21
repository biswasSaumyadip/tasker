import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UploadIconComponent } from '../../../components/icons/upload-icon.component';

@Component({
	selector: 'tasker-file-upload',
	imports: [UploadIconComponent],
	templateUrl: './file-upload.component.html',
	styleUrl: './file-upload.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent {}
