import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TeamMember } from '../models/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private _httpClient = inject(HttpClient);
	private TeamAPI = `${environment.apiUrl}/team`;

	getUserInfo() {
		return of({
			name: 'Admin User',
			email: 'admin@example.com',
			profilePicture: 'https://randomuser.me/api/portraits/men/30.jpg',
		});
	}

	getTeamMembers(): Observable<TeamMember[]> {
		return this._httpClient.get<TeamMember[]>(`${this.TeamAPI}/members`);
	}
}
