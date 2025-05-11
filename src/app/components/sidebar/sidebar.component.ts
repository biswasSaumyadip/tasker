import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { DashboardIconComponent } from '../icons/dashboard-icon.component';
import { TasksIconComponent } from '../icons/tasks-icon.component';
import { CalenderIconComponent } from '../icons/calender-icon.component';
import { TeamIconComponent } from '../icons/team-icon.component';
import { SettingsIconComponent } from '../icons/settings-icon.component';

@Component({
	selector: 'tasker-sidebar',
	imports: [
		AvatarModule,
		RouterLink,
		RouterLinkActive,
		DashboardIconComponent,
		TasksIconComponent,
		CalenderIconComponent,
		TeamIconComponent,
		SettingsIconComponent,
	],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
