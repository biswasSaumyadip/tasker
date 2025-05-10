import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';

@Component({
  selector: 'tasker-sidebar',
  imports: [AvatarModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
