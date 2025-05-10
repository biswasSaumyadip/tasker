import {Component, Type} from '@angular/core';
import {TaskIconComponent} from '../icons/task-Icon.component';
import {CheckedIconComponent} from '../icons/checked-icon.component';
import {ExclamationIconComponent} from '../icons/exclamation-icon.component';
import {ClockIconComponent} from '../icons/clock-icon.component';
import {StatCardComponent} from './stat-card/stat-card.component';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';

interface StatCardData {
  title: string;
  count: number;
  icon: Type<unknown>;
}

@Component({
  selector: 'tasker-dashboard',
  imports: [
    StatCardComponent,
    Card,
    Button
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  protected readonly stats: StatCardData[] = [
    { title: 'Total Tasks', count: 3, icon: TaskIconComponent },
    { title: 'Completed', count: 0, icon: CheckedIconComponent },
    { title: 'Overdue', count: 0, icon: ExclamationIconComponent },
    { title: 'Due Soon', count: 2, icon: ClockIconComponent }
  ];
}
