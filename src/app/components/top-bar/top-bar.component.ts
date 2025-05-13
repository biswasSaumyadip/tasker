import { Component, inject, ViewChild, ElementRef, HostBinding, HostListener } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { SearchIconComponent } from '../icons/search-icon.component';
import { BellIconComponent } from '../icons/bell-icon.component';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
	selector: 'tasker-top-bar',
	standalone: true,
	imports: [InputText, SearchIconComponent, BellIconComponent, AsyncPipe],
	templateUrl: './top-bar.component.html',
	styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
	@HostBinding('style.width') width = '100%';
	@HostBinding('style.height') height = '100%';
	@HostBinding('style.display') display = 'block';

	private _userService: UserService = inject(UserService);
	private _notificationService: NotificationService = inject(NotificationService);

	@ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

	user$ = this._userService.getUserInfo();
	notificationCount$ = this._notificationService.notificationCount();

	@HostListener('window:keydown', ['$event'])
	handleKeydown(event: KeyboardEvent) {
		// Check for Ctrl+K or Command+K (Mac)
		if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			this.searchInput.nativeElement.focus();
		}
	}

	onEscape() {
		this.searchInput.nativeElement.blur();
	}
}
