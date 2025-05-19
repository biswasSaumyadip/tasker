import {
	Component,
	EventEmitter,
	HostListener,
	Output,
	viewChild,
	ChangeDetectionStrategy,
} from '@angular/core';
import { SearchIconComponent } from '../icons/search-icon.component';
import { TaskerInputComponent } from '../../shared/components/tasker-input/tasker-input.component';

@Component({
	selector: 'tasker-search-bar',
	standalone: true,
	imports: [TaskerInputComponent, SearchIconComponent],
	templateUrl: './search-bar.component.html',
	styleUrl: './search-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
	searchInput = viewChild.required<TaskerInputComponent>('searchInput');
	@Output() searchChange = new EventEmitter<string>();

	@HostListener('window:keydown', ['$event'])
	handleKeydown(event: KeyboardEvent) {
		// Check for Ctrl+K or Command+K (Mac)
		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			this.searchInput().focusInput();
		}
	}

	onEscape() {
		this.searchInput().blurInput();
	}

	onInput(value: string) {
		this.searchChange.emit(value);
	}
}
