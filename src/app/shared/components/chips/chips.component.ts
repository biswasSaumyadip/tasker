import { Component, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskerInputComponent } from '../tasker-input/tasker-input.component';

@Component({
	selector: 'tasker-chips',
	standalone: true,
	imports: [CommonModule, TaskerInputComponent],
	template: `
		<div class="chips-container" [class.view-mode]="!editable()">
			@if (editable()) {
				<tasker-input
					[placeholder]="placeholder()"
					[className]="'chips-input'"
					[value]="inputValue()"
					(valueChange)="onInputChange($event)"
					(inputKeydown)="onKeyDown($event)"
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
export class ChipsComponent {
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
	}

	// Remove a chip
	removeChip(chip: string) {
		const updatedChips = this.chips().filter((c) => c !== chip);
		this.chips.set(updatedChips);
		this.chipsChange.emit(updatedChips);
	}
}
