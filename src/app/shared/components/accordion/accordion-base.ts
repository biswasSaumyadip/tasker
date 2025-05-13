import { computed, Directive, inject, Input, signal } from '@angular/core';
import { ACCORDION_TOKEN } from './accordion-token';

@Directive()
export abstract class AccordionItemBase {
	protected readonly accordion = inject(ACCORDION_TOKEN, { optional: true });
	protected readonly _expanded = signal(false);

	@Input()
	set expanded(value: boolean) {
		this._expanded.set(value);
	}
	get expanded(): boolean {
		return this._expanded();
	}

	isExpanded = computed(() => this._expanded());

	toggle(): void {
		if (!this.disabled) {
			this._expanded.update((value) => !value);
		}
	}

	@Input() disabled = false;
}
