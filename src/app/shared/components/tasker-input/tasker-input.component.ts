import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	forwardRef,
	input,
	output,
	signal,
	Type,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Interface for icon components
interface IconComponent {
	size?: unknown;
	fill?: unknown;
	stroke?: unknown;
	strokeWidth?: unknown;
	className?: unknown;
}

@Component({
	selector: 'tasker-input',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tasker-input.component.html',
	styleUrl: './tasker-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class]': 'className()',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TaskerInputComponent),
			multi: true,
		},
	],
})
export class TaskerInputComponent implements ControlValueAccessor {
	inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');
	placeholder = input<string>('');
	type = input<string>('text');
	icon = input<string | Type<IconComponent> | null>(null);

	isStringIcon() {
		return typeof this.icon() === 'string';
	}

	isComponentIcon() {
		return this.icon() !== null && typeof this.icon() !== 'string';
	}

	getComponentIcon(): Type<IconComponent> | null {
		return this.isComponentIcon() ? (this.icon() as Type<IconComponent>) : null;
	}

	value = input<string>('');
	className = input<string>('');
	disabled = input<boolean>(false);
	readonly = input<boolean>(false);
	autofocus = input<boolean>(false);
	required = input<boolean>(false);
	autocomplete = input<string>('off');
	spellcheck = input<boolean>(false);
	autocorrect = input<boolean>(false);
	autocapitalize = input<string>('off');
	tabindex = input<number>(0);
	valueChange = output<string>();
	inputBlur = output<void>();
	inputFocus = output<void>();
	inputKeydown = output<KeyboardEvent>();

	valueSignal = signal<string>(this.value());
	isDisabled = signal(this.disabled());

	// ControlValueAccessor implementation
	private onChange: (value: string) => void = () => {};
	private onTouched: () => void = () => {};

	writeValue(value: string): void {
		// Update the input value when the form control value changes
		if (value !== undefined) {
			this.valueSignal.set(value);
		}
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	onInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.valueChange.emit(value);
		this.onChange(value);
	}

	onBlur() {
		this.inputBlur.emit();
		this.onTouched();
	}

	onFocus() {
		this.inputFocus.emit();
	}

	onKeydown(event: KeyboardEvent) {
		this.inputKeydown.emit(event);
	}

	focusInput() {
		this.inputElement().nativeElement.focus();
	}

	blurInput() {
		this.inputElement().nativeElement.blur();
	}
}
