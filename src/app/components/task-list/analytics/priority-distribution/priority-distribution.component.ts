import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BarChartIconComponent } from '../../../icons/bar-chart-icon.component';

@Component({
	selector: 'tasker-priority-distribution',
	imports: [BarChartIconComponent],
	templateUrl: './priority-distribution.component.html',
	styleUrl: './priority-distribution.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriorityDistributionComponent {
	readonly high = input(0);
	readonly medium = input(0);
	readonly low = input(0);

	get max(): number {
		return Math.max(this.high(), this.medium(), this.low(), 1);
	}
}
