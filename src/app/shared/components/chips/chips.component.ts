import { Component, forwardRef, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TaskerInputComponent } from '../tasker-input/tasker-input.component';

@Component({
	selector: 'tasker-chips',
	standalone: true,
	imports: [CommonModule, TaskerInputComponent],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ChipsComponent),
			multi: true,
		},
	],
	template: `
		<div class="chips-container" [class.view-mode]="!editable()">
			@if (editable()) {
				<tasker-input
					[placeholder]="placeholder()"
					[className]="'chips-input'"
					[value]="inputValue()"
					(valueChange)="onInputChange($event)"
					(inputKeydown)="onKeyDown($event)"
					[disabled]="!isDisabled()"
				></tasker-input>
			}
			<div class="chip__wrapper">
				@for (chip of chips(); track chip) {
					<span class="chip">
						<span class="chip__text">{{ chip }}</span>
						@if (editable()) {
							<span class="chip__remove" (click)="removeChip(chip)">×</span>
						}
					</span>
				}
			</div>
		</div>
	`,
	styleUrl: './chips.component.scss',
})
export class ChipsComponent implements ControlValueAccessor {
	// Input for initial chips
	chips = model<string[]>([]);
	// Input for placeholder text
	placeholder = input<string>('Type and press Enter');
	// Input for editable mode
	editable = input<boolean>(true);
	// Signal for input value
	inputValue = signal('');
	// Output for chip changes
	chipsChange = output<string[]>();

	isDisabled = signal<boolean>(false);

	// ControlValueAccessor implementation
	private onChange: (value: string[]) => void = () => {};
	private onTouched: () => void = () => {};

	writeValue(value: string[]): void {
		// Update the chips when the form control value changes
		if (value !== undefined && value !== null) {
			this.chips.set(value);
		}
	}

	registerOnChange(fn: (value: string[]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(!isDisabled);
	}

	// Handle input value changes
	onInputChange(value: string) {
		this.inputValue.set(value);
	}

	onKeyDown(event: KeyboardEvent) {
		// Add chip when Enter is pressed and input is not empty
		if (event.key === 'Enter' && this.inputValue().trim() !== '') {
			this.addChip(this.inputValue().trim());
			this.inputValue.set('');
			event.preventDefault();
		}
	}

	addChip(value: string) {
		const updatedChips = [...this.chips(), value];
		this.chips.set(updatedChips);
		this.chipsChange.emit(updatedChips);
		this.onChange(updatedChips);
		this.onTouched();
	}

	// Remove a chip
	removeChip(chip: string) {
		const updatedChips = this.chips().filter((c) => c !== chip);
		this.chips.set(updatedChips);
		this.chipsChange.emit(updatedChips);
		this.onChange(updatedChips);
		this.onTouched();
	}
}
