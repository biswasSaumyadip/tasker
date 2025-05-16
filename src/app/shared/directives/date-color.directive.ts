import {
	Directive,
	ElementRef,
	EnvironmentInjector,
	inject,
	Input,
	OnInit,
	Renderer2,
} from '@angular/core';
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

	private el = inject(ElementRef);
	private renderer = inject(Renderer2);
	private injector = inject(EnvironmentInjector);

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

}
