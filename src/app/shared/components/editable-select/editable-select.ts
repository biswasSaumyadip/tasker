import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	input,
	output,
	OutputEmitterRef,
	signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditIconComponent } from '../../../components/icons/edit-icon.component';

@Component({
	selector: 'tasker-editable-select',
	template: `
		<span>
			{{ value || '—' }}
			@if (editable() && !disable()) {
				<EditIcon [size]="'12'" className="color__grey" (click)="triggerEdit()" />
			}
		</span>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => EditableSelectComponent),
			multi: true,
		},
	],
	imports: [EditIconComponent],
})
export class EditableSelectComponent implements ControlValueAccessor {
	readonly editable = input(true);
	readonly disable = signal(false);

	edit: OutputEmitterRef<boolean> = output();

	// Internal value from the form
	value: string | null = null;

	// CVA hooks
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onChange = (_: any) => {};
	onTouched = () => {};

	writeValue(value: any): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disable.set(isDisabled);
	}

	triggerEdit() {
		this.onTouched();
		this.edit.emit(true);
	}
}
