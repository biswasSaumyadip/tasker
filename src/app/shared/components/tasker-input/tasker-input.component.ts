import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	input,
	output,
	Type,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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
})
export class TaskerInputComponent {
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

	onInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.valueChange.emit(value);
	}

	onBlur() {
		this.inputBlur.emit();
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
