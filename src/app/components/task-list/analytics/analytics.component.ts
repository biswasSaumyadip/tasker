import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {CompletionRateComponent} from './completion-rate/completion-rate.component';
import {PriorityDistributionComponent} from './priority-distribution/priority-distribution.component';
import {PerformanceCardComponent} from './performance-card/performance-card.component';

@Component({
  selector: 'tasker-analytics',
  imports: [
    Card,
    CompletionRateComponent,
    PriorityDistributionComponent,
    PerformanceCardComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

}
