import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ClockIcon',
	template: `
		<svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0.25 6C0.25 2.68629 2.93629 0 6.25 0H42.25C45.5637 0 48.25 2.68629 48.25 6V42C48.25 45.3137 45.5637 48 42.25 48H6.25C2.93629 48 0.25 45.3137 0.25 42V6Z"
				fill="#FEF9C3"
			/>
			<path
				d="M24.25 34C29.7728 34 34.25 29.5228 34.25 24C34.25 18.4772 29.7728 14 24.25 14C18.7272 14 14.25 18.4772 14.25 24C14.25 29.5228 18.7272 34 24.25 34Z"
				stroke="#CA8A04"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M24.25 18V24L28.25 26"
				stroke="#CA8A04"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	`,
})
export class ClockIconComponent {}
