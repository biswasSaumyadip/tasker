import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { TrendingIconComponent } from '../../../icons/trending-icon.component';

@Component({
	selector: 'tasker-performance-card',
	imports: [TrendingIconComponent],
	templateUrl: './performance-card.component.html',
	styleUrl: './performance-card.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceCardComponent {
	readonly avgCompletionTime = input<number>(0);
	readonly overdueTasks = input<number>(0);
}
