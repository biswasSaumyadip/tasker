import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private API = 'http://localhost:3000/api/tasks';

  private http: HttpClient = inject(HttpClient);

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  createTask(name: string): Observable<any> {
    return this.http.post(this.API, { name });
  }

  startTask(id: string): Observable<any> {
    return this.http.post(`${this.API}/${id}/start`, {});
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }
}
