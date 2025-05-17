import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CreateTaskDto, Task, TaskResponse, TaskWithChildren } from '../models/task.model';
import { environment } from '../../environments/environment';
import { UtilityService } from '../shared/services/utility.service';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	private API = `${environment.apiUrl}/task`;

	private http: HttpClient = inject(HttpClient);
	private _utilityService: UtilityService = inject(UtilityService);

	getTasks(): Observable<TaskWithChildren[]> {
		return this.http
			.get<Task[]>(`${this.API}/list`)
			.pipe(map((tasks) => this._utilityService.buildTaskTree(tasks)));
	}

	createTask(name: string): Observable<TaskResponse> {
		const dto: CreateTaskDto = { name };
		return this.http.post<TaskResponse>(this.API, dto);
	}

	startTask(id: string): Observable<TaskResponse> {
		return this.http.post<TaskResponse>(`${this.API}/${id}/start`, {});
	}

	getTask(id: string): Observable<Task> {
		return this.http.get<Task>(`${this.API}/${id}`);
	}
}
