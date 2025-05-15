import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, CreateTaskDto, TaskResponse } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	private API = `${environment.apiUrl}/task`;

	private http: HttpClient = inject(HttpClient);

	getTasks(): Observable<Task[]> {
		return this.http.get<Task[]>(`${this.API}/list`);
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
