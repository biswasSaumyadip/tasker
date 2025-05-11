import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	constructor() {}

	notificationCount() {
		return of(0)
			.pipe(map(() => randomInt(1, 200)))
			.pipe(map((count) => (count > 99 ? '99+' : count?.toString())));
	}
}

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
