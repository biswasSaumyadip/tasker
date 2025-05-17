import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'tasker-icon',
	standalone: true,
	imports: [CommonModule],
	template: `
		<svg
			xmlns="http://www.w3.org/2000/svg"
			[attr.width]="size()"
			[attr.height]="size()"
			viewBox="0 0 24 24"
			[attr.fill]="fill()"
			[attr.stroke]="stroke()"
			[attr.stroke-width]="strokeWidth()"
			stroke-linecap="round"
			stroke-linejoin="round"
			[class]="className()"
		>
			<ng-container [ngSwitch]="type()">
				<ng-container *ngSwitchCase="'check-circle'">
					<path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
					<path d="m9 11 3 3L22 4"></path>
				</ng-container>
				<!-- Additional icon types can be added here in the future -->
			</ng-container>
		</svg>
	`,
	styleUrl: './icon.component.scss',
})
export class IconComponent {
	// Input properties with default values
	type: InputSignal<string> = input('check-circle');
	size: InputSignal<string> = input('24');
	fill: InputSignal<string> = input('none');
	stroke: InputSignal<string> = input('currentColor');
	strokeWidth: InputSignal<string> = input('2');
	className: InputSignal<string> = input('');
}
