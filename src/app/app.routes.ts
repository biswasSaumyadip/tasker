import {Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {TaskCreateComponent} from './components/task-create/task-create.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {TeamComponent} from './components/team/team.component';
import {SettingsComponent} from './components/settings/settings.component';

export const routes: Routes = [{
  path: '', children: [{path: '', redirectTo: 'dashboard', pathMatch: 'full'},

    // Dashboard
    {path: 'dashboard', component: DashboardComponent},

    // Tasks
    {
      path: 'tasks',
      children: [{path: '', component: TaskListComponent}, {path: 'create', component: TaskCreateComponent}
        // future: { path: ':id', component: TaskDetailComponent }
      ]
    },

    // Calendar
    {path: 'calendar', component: CalendarComponent},

    // Team
    {path: 'team', component: TeamComponent},

    // Settings
    {
      path: 'settings', component: SettingsComponent
    },

  ]
}];
