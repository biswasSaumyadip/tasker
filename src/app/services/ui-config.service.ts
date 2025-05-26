import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { DropdownOption } from '../shared/components/dropdown/dropdown.component';
import { TaskResponse } from '../models/task.model';

@Injectable({
	providedIn: 'root',
})
export class UiConfigService {
	private API = `${environment.apiUrl}/uiConfig`;
	private _httpClient = inject(HttpClient);

	getPriorityLabels(id: string): Observable<DropdownOption<string>[]> {
		return this._httpClient
			.get<TaskResponse<DropdownOption<string>[]>>(`${this.API}/priorityLabels?id=${id}`)
			.pipe(map((resp) => resp.data));
	}
}
