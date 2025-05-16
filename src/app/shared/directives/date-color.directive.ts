import {
	ComponentRef,
	createComponent,
	Directive,
	ElementRef,
	EnvironmentInjector,
	Input,
	OnInit,
	Renderer2,
	ViewContainerRef,
} from '@angular/core';
import { ClockIconComponent } from '../../components/icons/clock-icon.component';
import { ExclamationIconComponent } from '../../components/icons/exclamation-icon.component';
import { UtilityService } from '../services/utility.service';

@Directive({
	selector: '[taskerDateColor]',
	standalone: true,
})
export class DateColorDirective implements OnInit {
	@Input({ required: true }) dueDate!: Date | string;

	// CSS classes for date status
	private readonly PAST_DUE_CLASS = 'date-past-due';
	private readonly APPROACHING_DUE_CLASS = 'date-approaching-due';
	private readonly FUTURE_DUE_CLASS = 'date-future-due';

	// Icon component references
	private iconComponentRef: ComponentRef<ClockIconComponent | ExclamationIconComponent> | null =
		null;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		private _: ViewContainerRef,
		private injector: EnvironmentInjector,
	) {}

	ngOnInit(): void {
		this.applyColorClass();
	}

	private applyColorClass(): void {
		const dueDateObj = typeof this.dueDate === 'string' ? new Date(this.dueDate) : this.dueDate;
		const today = new Date();

		// Reset hours, minutes, seconds, and milliseconds for accurate day comparison
		today.setHours(0, 0, 0, 0);
		dueDateObj.setHours(0, 0, 0, 0);

		const status = this.injector.get(UtilityService).getDueDateStatus(dueDateObj);

		// Remove any existing date status classes
		this.renderer.removeClass(this.el.nativeElement, this.PAST_DUE_CLASS);
		this.renderer.removeClass(this.el.nativeElement, this.APPROACHING_DUE_CLASS);
		this.renderer.removeClass(this.el.nativeElement, this.FUTURE_DUE_CLASS);

		switch (status) {
			case 'past':
				this.renderer.addClass(this.el.nativeElement, this.PAST_DUE_CLASS);
				break;
			case 'approaching':
				this.renderer.addClass(this.el.nativeElement, this.APPROACHING_DUE_CLASS);
				break;
			case 'future':
				this.renderer.addClass(this.el.nativeElement, this.FUTURE_DUE_CLASS);
				break;
		}
	}

	private createAndInsertIcon(isPastDue: boolean): void {
		// Clear any existing icon
		if (this.iconComponentRef) {
			this.iconComponentRef.destroy();
			this.iconComponentRef = null;
		}

		// Create the appropriate icon component
		if (isPastDue) {
			this.iconComponentRef = createComponent(ExclamationIconComponent, {
				environmentInjector: this.injector,
				hostElement: this.el.nativeElement,
			});
		} else {
			this.iconComponentRef = createComponent(ClockIconComponent, {
				environmentInjector: this.injector,
				hostElement: this.el.nativeElement,
			});
		}

		// Insert the icon before the text
		const iconElement = this.iconComponentRef.location.nativeElement;
		this.renderer.setStyle(iconElement, 'display', 'inline-block');
		this.renderer.setStyle(iconElement, 'vertical-align', 'middle');
		this.renderer.setStyle(iconElement, 'margin-right', '4px');
		this.renderer.setStyle(iconElement, 'width', '16px');
		this.renderer.setStyle(iconElement, 'height', '16px');

		// Insert the icon at the beginning of the element
		this.renderer.insertBefore(
			this.el.nativeElement,
			iconElement,
			this.el.nativeElement.firstChild,
		);
	}
}
