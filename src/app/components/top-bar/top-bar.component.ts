import { Component, HostBinding, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BellIconComponent } from '../icons/bell-icon.component';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
	selector: 'tasker-top-bar',
	standalone: true,
	imports: [BellIconComponent, AsyncPipe, SearchBarComponent],
	templateUrl: './top-bar.component.html',
	styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
	@HostBinding('style.width') width = '100%';
	@HostBinding('style.height') height = '100%';
	@HostBinding('style.display') display = 'block';

	private _userService: UserService = inject(UserService);
	private _notificationService: NotificationService = inject(NotificationService);

	user$ = this._userService.getUserInfo();
	notificationCount$ = this._notificationService.notificationCount();

	onSearch(searchTerm: string) {
		// Handle search functionality
		console.error('Search term:', searchTerm);
	}
}
