import {Component, inject} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {SearchIconComponent} from '../icons/search-icon.component';
import {BellIconComponent} from '../icons/bell-icon.component';
import {UserService} from '../../services/user.service';
import {AsyncPipe} from '@angular/common';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'tasker-top-bar',
  imports: [
    InputText,
    SearchIconComponent,
    BellIconComponent,
    AsyncPipe
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  host: {'[style.width]': "'100%'", '[style.height]': "'100%'", '[style.display]': "'block'"}
})
export class TopBarComponent {
  private _userService: UserService = inject(UserService);
  private _notificationService: NotificationService = inject(NotificationService);

  user$ = this._userService.getUserInfo();
  notificationCount$ = this._notificationService.notificationCount();
}
