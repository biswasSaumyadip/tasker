import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	forwardRef,
	output,
	signal,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { UploadIconComponent } from '../../../components/icons/upload-icon.component';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'tasker-file-upload',
	standalone: true,
	imports: [CommonModule, UploadIconComponent],
	templateUrl: './file-upload.component.html',
	styleUrl: './file-upload.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FileUploadComponent),
			multi: true,
		},
	],
})
export class FileUploadComponent implements ControlValueAccessor {
	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

	// Output for selected files
	filesSelected = output<File[]>();

	// Signal to track uploaded files
	uploadedFiles = signal<File[]>([]);

	// Maximum file size in bytes (10MB)
	private maxFileSize = 10 * 1024 * 1024;

	// ControlValueAccessor implementation
	private onChange: (value: File[]) => void = () => {};
	private onTouched: () => void = () => {};

	writeValue(value: File[]): void {
		if (value !== undefined && value !== null) {
			this.uploadedFiles.set(value);
		}
	}

	registerOnChange(fn: (value: File[]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setDisabledState(isDisabled: boolean): void {
		// This component doesn't have a disabled state
	}

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

			// Notify Angular forms
			this.onChange(updatedFiles);
			this.onTouched();
		}
	}

	// Remove a file from the list
	removeFile(fileToRemove: File): void {
		const updatedFiles = this.uploadedFiles().filter((file) => file !== fileToRemove);
		this.uploadedFiles.set(updatedFiles);
		this.filesSelected.emit(updatedFiles);

		// Notify Angular forms
		this.onChange(updatedFiles);
		this.onTouched();
	}
}
