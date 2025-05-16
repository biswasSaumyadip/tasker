import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'tasker-chips',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="chip__wrapper">
			@for (chip of chips(); track chip) {
				<span class="chip">
					<span class="chip__text">{{ chip }}</span>
				</span>
			}
		</div>
	`,
	styleUrl: './chips.component.scss',
})
export class ChipsComponent {
	chips: InputSignal<string[]> = input.required();
}
