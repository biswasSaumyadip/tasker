import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { environment } from '../../environments/environment';
import { Task, TaskResponse } from '../models/task.model';
import { provideHttpClient } from '@angular/common/http';

describe('TasksService', () => {
	let service: TasksService;
	let httpMock: HttpTestingController;
	const API = `${environment.apiUrl}/task`;

	const mockTask: Task = {
		id: '1',
		title: 'Test Task',
		description: 'Test Description',
		completed: false,
		priority: 'medium',
		dueDate: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		assignedTo: 'user1',
		parentId: null,
		tags: ['test'],
		profilePicture: 'test.jpg',
	};

	const mockTaskResponse: TaskResponse = {
		data: mockTask,
		message: 'Task created successfully',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TasksService, provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(TasksService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get all tasks', () => {
		const mockTasks: Task[] = [mockTask];

		service.getTasks().subscribe((tasks) => {
			expect(tasks).toEqual(mockTasks);
		});

		const req = httpMock.expectOne(`${API}/list`);
		expect(req.request.method).toBe('GET');
		req.flush(mockTasks);
	});

	it('should create a task', () => {
		const taskName = 'New Task';

		service.createTask(taskName).subscribe((response) => {
			expect(response).toEqual(mockTaskResponse);
		});

		const req = httpMock.expectOne(API);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toEqual({ name: taskName });
		req.flush(mockTaskResponse);
	});

	it('should start a task', () => {
		const taskId = '1';

		service.startTask(taskId).subscribe((response) => {
			expect(response).toEqual(mockTaskResponse);
		});

		const req = httpMock.expectOne(`${API}/${taskId}/start`);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toEqual({});
		req.flush(mockTaskResponse);
	});

	it('should get a single task', () => {
		const taskId = '1';

		service.getTask(taskId).subscribe((task) => {
			expect(task).toEqual(mockTask);
		});

		const req = httpMock.expectOne(`${API}/${taskId}`);
		expect(req.request.method).toBe('GET');
		req.flush(mockTask);
	});
});
