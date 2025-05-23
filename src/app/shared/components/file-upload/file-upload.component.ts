import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewChild,
	ViewEncapsulation,
	output,
	signal,
} from '@angular/core';
import { UploadIconComponent } from '../../../components/icons/upload-icon.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'tasker-file-upload',
	standalone: true,
	imports: [CommonModule, UploadIconComponent],
	templateUrl: './file-upload.component.html',
	styleUrl: './file-upload.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent {
	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

	// Output for selected files
	filesSelected = output<File[]>();

	// Signal to track uploaded files
	uploadedFiles = signal<File[]>([]);

	// Maximum file size in bytes (10MB)
	private maxFileSize = 10 * 1024 * 1024;

	// Trigger file input click
	triggerFileInput(): void {
		this.fileInput.nativeElement.click();
	}

	// Handle file selection
	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.processFiles(input.files);
		}
	}

	// Handle drag over event
	onDragOver(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
	}

	// Handle drop event
	onDrop(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			this.processFiles(files);
		}
	}

	// Process and validate files
	private processFiles(fileList: FileList): void {
		const files: File[] = Array.from(fileList);

		// Filter out files that exceed the size limit
		const validFiles = files.filter((file) => {
			const isValid = file.size <= this.maxFileSize;
			if (!isValid) {
				console.warn(`File "${file.name}" exceeds the 10MB size limit.`);
			}
			return isValid;
		});

		if (validFiles.length > 0) {
			// Update the uploaded files list
			const updatedFiles = [...this.uploadedFiles(), ...validFiles];
			this.uploadedFiles.set(updatedFiles);

			// Emit the updated files list
			this.filesSelected.emit(updatedFiles);
		}
	}

	// Remove a file from the list
	removeFile(fileToRemove: File): void {
		const updatedFiles = this.uploadedFiles().filter((file) => file !== fileToRemove);
		this.uploadedFiles.set(updatedFiles);
		this.filesSelected.emit(updatedFiles);
	}
}
