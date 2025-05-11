import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor() {}

	getUserInfo() {
		return of({
			name: 'Admin User',
			email: 'admin@example.com',
			profilePicture: 'https://randomuser.me/api/portraits/men/30.jpg',
		});
	}
}
