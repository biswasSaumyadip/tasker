import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BarChartIconComponent } from '../../../icons/bar-chart-icon.component';

@Component({
	selector: 'tasker-priority-distribution',
	imports: [BarChartIconComponent],
	templateUrl: './priority-distribution.component.html',
	styleUrl: './priority-distribution.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriorityDistributionComponent {
	@Input() high = 0;
	@Input() medium = 0;
	@Input() low = 0;

	get max(): number {
		return Math.max(this.high, this.medium, this.low, 1);
	}
}
