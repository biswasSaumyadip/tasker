import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TeamComponent } from './components/team/team.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskAddComponent } from './components/task-add/task-add.component';

export const routes: Routes = [
	{
		path: '',
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },

			// Dashboard
			{ path: 'dashboard', component: DashboardComponent },

			// Tasks
			{
				path: 'tasks',
				children: [
					{ path: '', component: TaskListComponent },
					{ path: 'create', component: TaskAddComponent },
					// future: { path: ':id', component: TaskDetailComponent }
					{ path: 'edit/:id', component: TaskEditComponent },
				],
			},

			// Calendar
			{ path: 'calendar', component: CalendarComponent },

			// Team
			{ path: 'team', component: TeamComponent },

			// Settings
			{
				path: 'settings',
				component: SettingsComponent,
			},
		],
	},
];
