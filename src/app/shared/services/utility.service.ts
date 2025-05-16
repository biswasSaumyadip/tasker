import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UtilityService {
	getDueDateStatus(dueDate: Date | string): 'past' | 'approaching' | 'future' {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const due = new Date(dueDate);
		due.setHours(0, 0, 0, 0);

		const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

		if (diffDays < 0) return 'past';
		if (diffDays <= 3) return 'approaching';
		return 'future';
	}
}
