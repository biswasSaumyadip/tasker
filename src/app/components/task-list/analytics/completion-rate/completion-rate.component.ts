import { Component, input, InputSignal, ViewEncapsulation } from '@angular/core';
import { PieChartIconComponent } from '../../../icons/pie-chart-icon.component';

@Component({
	selector: 'tasker-completion-rate',
	imports: [PieChartIconComponent],
	templateUrl: './completion-rate.component.html',
	styleUrl: './completion-rate.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class CompletionRateComponent {
	completionRate: InputSignal<number> = input<number>(0);
}
