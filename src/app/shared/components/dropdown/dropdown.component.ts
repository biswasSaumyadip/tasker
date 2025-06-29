import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostListener,
	inject,
	input,
	InputSignal,
	OnInit,
	Output,
	signal,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

export interface DropdownOption<T> {
	label: string;
	value: T;
	disabled?: boolean;
	icon?: string;
	isSelected?: boolean;
}

@Component({
	selector: 'tasker-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DropdownComponent),
			multi: true,
		},
	],
	animations: [
		trigger('dropdownAnimation', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-8px)' }),
				animate(
					'150ms cubic-bezier(0.4, 0, 0.2, 1)',
					style({ opacity: 1, transform: 'translateY(0)' }),
				),
			]),
			transition(':leave', [
				animate(
					'100ms cubic-bezier(0.4, 0, 0.2, 1)',
					style({ opacity: 0, transform: 'translateY(-8px)' }),
				),
			]),
		]),
	],
})
export class DropdownComponent<T> implements OnInit, ControlValueAccessor {
	private destroyRef = inject(DestroyRef);

	options: InputSignal<DropdownOption<T>[]> = input([] as DropdownOption<T>[]);
	readonly placeholder = input('Select an option');
	readonly searchable = input(false);
	readonly clearable = input(false);
	readonly loading = input(false);
	readonly disabled = input(false);
	readonly error = input(false);

	@Output() selectionChange = new EventEmitter<DropdownOption<T> | undefined>();
	@Output() opened = new EventEmitter<void>();
	// ControlValueAccessor implementation
	private onChange: (value: T | undefined) => void = () => {};
	private onTouched: () => void = () => {};

	@ViewChild('dropdown') dropdownElement?: ElementRef;

	isOpen = signal(false);
	selectedOption = signal<DropdownOption<T> | null>(null);
	searchTerm = signal('');
	activeIndex = signal(-1);

	private internalDisabled = signal(false);

	readonly isDisabled = computed(() => this.disabled() || this.internalDisabled());

	// ControlValueAccessor methods
	writeValue(value: T | null): void {
		if (value === null || value === undefined) {
			this.selectedOption.set(null);
			return;
		}

		const option = this.options()?.find(
			(opt) => opt.value === value || opt.label === value || opt.isSelected,
		);
		if (option) {
			this.selectedOption.set(option);
		}
	}

	registerOnChange(fn: (value: T | undefined) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.internalDisabled.set(isDisabled);
	}

	get filteredOptions(): DropdownOption<T>[] {
		const term = this.searchTerm().toLowerCase();
		if (!term) return this.options();
		return this.options().filter((option) => option.label.toLowerCase().includes(term));
	}

	ngOnInit() {
		fromEvent(document, 'click')
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((event: Event) => {
				if (!this.dropdownElement?.nativeElement.contains(event.target)) {
					this.isOpen.set(false);
				}
			});
	}

	toggleDropdown(event: Event) {
		event.stopPropagation();
		if (!this.disabled()) {
			this.isOpen.update((value) => !value);
			if (this.isOpen()) {
				this.activeIndex.set(
					this.selectedOption() ? this.options().indexOf(this.selectedOption()!) : -1,
				);
				// Emit the opened event when the dropdown is opened
				this.opened.emit();
			}
		}
	}

	selectOption(option: DropdownOption<T>, event: Event) {
		event.stopPropagation();
		if (option.disabled) return;

		this.selectedOption.set(option);
		this.selectionChange.emit(option);
		this.onChange(option.value);
		this.onTouched();
		this.isOpen.set(false);
		this.searchTerm.set('');
	}

	clearSelection(event: Event) {
		event.stopPropagation();
		this.selectedOption.set(null);
		this.selectionChange.emit(undefined);
		this.onChange(undefined);
		this.onTouched();
		this.searchTerm.set('');
	}

	@HostListener('keydown', ['$event'])
	handleKeydown(event: KeyboardEvent) {
		if (!this.isOpen()) return;

		switch (event.key) {
			case 'Escape':
				this.isOpen.set(false);
				this.searchTerm.set('');
				break;

			case 'Enter':
				if (this.activeIndex() >= 0 && this.activeIndex() < this.filteredOptions.length) {
					this.selectOption(this.filteredOptions[this.activeIndex()], event);
				}
				break;

			case 'ArrowDown':
				event.preventDefault();
				this.activeIndex.update((current) =>
					Math.min(current + 1, this.filteredOptions.length - 1),
				);
				this.scrollActiveOptionIntoView();
				break;

			case 'ArrowUp':
				event.preventDefault();
				this.activeIndex.update((current) => Math.max(current - 1, 0));
				this.scrollActiveOptionIntoView();
				break;
		}
	}

	private scrollActiveOptionIntoView() {
		const activeOption = document.querySelector('.dropdown__option--active');
		if (activeOption) {
			activeOption.scrollIntoView({ block: 'nearest' });
		}
	}
}
