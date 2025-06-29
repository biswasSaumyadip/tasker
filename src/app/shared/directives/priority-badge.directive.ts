import { Directive, input } from '@angular/core';

export type PriorityLevel = 'high' | 'medium' | 'low';

@Directive({
	selector: '[taskerPriorityBadge]',
	standalone: true,
	host: {
		class: 'badge',
		'[class]': 'priorityClass',
	},
})
export class PriorityBadgeDirective {
	readonly priority = input.required<PriorityLevel>();

	get priorityClass(): string {
		switch (this.priority().toLocaleLowerCase()) {
			case 'high':
				return 'badge-error';
			case 'medium':
				return 'badge-warning';
			case 'low':
				return 'badge-success';
			default:
				return '';
		}
	}
}
