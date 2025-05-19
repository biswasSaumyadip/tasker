import {
	ChangeDetectionStrategy,
	Component,
	effect,
	forwardRef,
	input,
	InputSignal,
	model,
	ModelSignal,
	OnInit,
	output,
	OutputEmitterRef,
	Signal,
	viewChild,
	ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Editor, EditorInitEvent, EditorModule } from 'primeng/editor';
import { QuillModules } from '../../../models/QuilEditorModule.interface';
import Quill from 'quill';

@Component({
	selector: 'tasker-rich-text-editor',
	standalone: true,
	templateUrl: './rich-text-editor.component.html',
	styleUrls: ['./rich-text-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [EditorModule, FormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RichTextEditorComponent),
			multi: true,
		},
	],
})
export class RichTextEditorComponent implements ControlValueAccessor, OnInit {
	// Input properties
	placeholder: InputSignal<string> = input('');
	height: InputSignal<string> = input('200px');
	disabled: InputSignal<boolean> = input(false);
	className: InputSignal<string> = input('');

	// Two-way binding for content
	content: ModelSignal<string> = model('');
	primengQuill: Signal<Editor | undefined> = viewChild('pEditor');

	constructor() {
		effect(() => {
			const contentValue = this.content();
			if (this.editorContent !== contentValue) {
				this.editorContent = contentValue;
			}
		});

		// afterRender({
		// 	earlyRead: () => {
		// 		console.log(this.primengQuill()?.quill);
		// 	},
		// });
	}

	// Local property for ngModel binding
	editorContent: string = '';

	// Output events
	textChange: OutputEmitterRef<string> = output<string>();

	// Quill editor configuration to preserve formatting when creating a new line
	modules: QuillModules = {
		keyboard: {
			bindings: {
				handleEnter: {
					key: 13,
					handler: function (
						this: Quill,
						range: {
							index: number;
							length: number;
						},
					): void {
						const format = this.getFormat(range);
						this.insertText(range.index, '\n', format, 'user');
						this.setSelection(range.index + 1, 'silent');
					},
				},
			},
		},
	};

	// For ControlValueAccessor
	private onChange: (value: string) => void = () => {};
	private onTouched: () => void = () => {};

	// Handle content changes
	onContentChange(value: string): void {
		this.content.set(value);
		this.editorContent = value;
		this.onChange(value);
		this.textChange.emit(value);
	}

	// ControlValueAccessor implementation
	writeValue(value: string): void {
		if (value !== undefined) {
			this.content.set(value);
			this.editorContent = value;
		}
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setDisabledState(isDisabled: boolean): void {
		// We use the input() signal, so we can't directly set it
		// This is handled by the template binding to the disabled input
	}

	ngOnInit(): void {
		// Initialize editorContent with content signal value
		this.editorContent = this.content();

		this.primengQuill()?.onInit.subscribe((event: EditorInitEvent) => {
			const quill = event.editor;

			quill.keyboard.addBinding(
				{ key: 13 }, // Enter key
				function (range: RangeStatic) {
					const format = quill.getFormat(range);
					quill.insertText(range.index, '\n', format, 'user');
					quill.setSelection(range.index + 1, 'silent');
					return false; // Prevent default
				},
			);
		});
	}

	onEditorInit(event: { editor: Quill }) {
		const quill = event.editor;

		quill.on('text-change', (delta, oldDelta, source) => {
			if (source !== 'user') return;

			// Check if user pressed Enter (newline inserted)
			const newlineInserted = delta.ops?.some((op) => op.insert === '\n');
			if (!newlineInserted) return;

			const range = quill.getSelection();
			if (!range) return;

			// Get formats at the position *before* the cursor (previous char)
			const prevIndex = range.index - 1;
			if (prevIndex < 0) return;

			const prevFormats = quill.getFormat(prevIndex);

			// Get block formats of the previous line
			const [prevLine] = quill.getLine(prevIndex);
			const blockFormats = prevLine ? prevLine.formats() : {};

			// Apply block formats to the new line (where cursor is now)
			quill.formatLine(range.index, 1, blockFormats);

			// Apply inline formats to the new line
			Object.entries(prevFormats).forEach(([name, value]) => {
				if (blockFormats.hasOwnProperty(name)) return; // skip block level
				if (name === 'code' || name === 'link') return; // skip code/link
				quill.format(name, value, 'user');
			});
		});
	}
}

export interface RangeStatic {
	index: number;
	length: number;
}
