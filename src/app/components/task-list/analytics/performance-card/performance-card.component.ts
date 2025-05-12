import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TrendingIconComponent } from '../../../icons/trending-icon.component';

@Component({
	selector: 'tasker-performance-card',
	imports: [TrendingIconComponent],
	templateUrl: './performance-card.component.html',
	styleUrl: './performance-card.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class PerformanceCardComponent {
	@Input() avgCompletionTime: number = 0;
	@Input() overdueTasks: number = 0;
}
