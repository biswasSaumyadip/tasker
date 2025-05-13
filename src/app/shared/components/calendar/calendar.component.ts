import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	computed,
	signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CalendarDate {
	date: Date;
	isCurrentMonth: boolean;
	isToday: boolean;
	hasEvents: boolean;
	events?: CalendarEvent[];
}

export interface CalendarEvent {
	id: string | number;
	title: string;
	date: Date;
	color?: string;
}

@Component({
	selector: 'tasker-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
	@Input() events: CalendarEvent[] = [];
	@Output() dateClick = new EventEmitter<Date>();
	@Output() eventClick = new EventEmitter<CalendarEvent>();

	currentDate = signal(new Date());
	view = signal<'month' | 'week'>('month');

	weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	calendarDays = computed(() => {
		const date = this.currentDate();
		const month = date.getMonth();
		const year = date.getFullYear();

		const firstDayOfMonth = new Date(year, month, 1);
		const lastDayOfMonth = new Date(year, month + 1, 0);

		const startDate = new Date(firstDayOfMonth);
		startDate.setDate(startDate.getDate() - startDate.getDay());

		const endDate = new Date(lastDayOfMonth);
		if (endDate.getDay() !== 6) {
			endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
		}

		const days: CalendarDate[] = [];
		const today = new Date();

		for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
			const currentDate = new Date(d);
			const eventsForDay = this.events.filter(
				(event) =>
					event.date.getDate() === currentDate.getDate() &&
					event.date.getMonth() === currentDate.getMonth() &&
					event.date.getFullYear() === currentDate.getFullYear(),
			);

			days.push({
				date: currentDate,
				isCurrentMonth: currentDate.getMonth() === month,
				isToday:
					currentDate.getDate() === today.getDate() &&
					currentDate.getMonth() === today.getMonth() &&
					currentDate.getFullYear() === today.getFullYear(),
				hasEvents: eventsForDay.length > 0,
				events: eventsForDay,
			});
		}

		return days;
	});

	weeks = computed(() => {
		const days = this.calendarDays();
		const weeks: CalendarDate[][] = [];
		let currentWeek: CalendarDate[] = [];

		days.forEach((day) => {
			currentWeek.push(day);
			if (currentWeek.length === 7) {
				weeks.push(currentWeek);
				currentWeek = [];
			}
		});

		return weeks;
	});

	monthName = computed(() => {
		const date = this.currentDate();
		return date.toLocaleString('default', { month: 'long', year: 'numeric' });
	});

	previousMonth() {
		this.currentDate.update((date) => {
			const newDate = new Date(date);
			newDate.setMonth(date.getMonth() - 1);
			return newDate;
		});
	}

	nextMonth() {
		this.currentDate.update((date) => {
			const newDate = new Date(date);
			newDate.setMonth(date.getMonth() + 1);
			return newDate;
		});
	}

	goToToday() {
		this.currentDate.set(new Date());
	}

	onDateClick(date: Date) {
		this.dateClick.emit(date);
	}

	onEventClick(event: CalendarEvent, e: Event) {
		e.stopPropagation();
		this.eventClick.emit(event);
	}

	trackByDate(index: number, item: CalendarDate) {
		return item.date.toISOString();
	}

	trackByEvent(index: number, item: CalendarEvent) {
		return item.id;
	}
}
