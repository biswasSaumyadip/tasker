import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task, TaskDetail, TaskResponse, TaskWithChildren } from '../models/task.model';
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
		return this.http.get<TaskResponse<Task[]>>(`${this.API}/list`).pipe(
			map((resp) => resp.data),
			map((tasks) => this._utilityService.buildTaskTree(tasks)),
		);
	}

	createTask(formData: FormData): Observable<TaskResponse<string>> {
		return this.http.post<TaskResponse<string>>(this.API, formData);
	}

	startTask(id: string): Observable<TaskResponse<Task>> {
		return this.http.post<TaskResponse<Task>>(`${this.API}/${id}/start`, {});
	}

	getTask(id: string): Observable<TaskDetail> {
		return this.http
			.get<TaskResponse<TaskDetail>>(`${this.API}/${id}`)
			.pipe(map((resp) => resp.data));
	}

	deleteTask(id: string): Observable<TaskResponse<string>> {
		return this.http.delete<TaskResponse<string>>(`${this.API}/${id}`);
	}

	updateTask(formData: FormData, id: string): Observable<TaskResponse<string>> {
		return this.http.post<TaskResponse<string>>(`${this.API}/${id}`, formData);
	}
}
