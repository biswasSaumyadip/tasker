import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { environment } from '../../environments/environment';
import { Task, TaskResponse, TaskWithChildren } from '../models/task.model';
import { provideHttpClient } from '@angular/common/http';
import { UtilityService } from '../shared/services/utility.service';

describe('TasksService', () => {
	let service: TasksService;
	let httpMock: HttpTestingController;
	let utilityService: UtilityService;
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

	const mockChildTask: Task = {
		id: '2',
		title: 'Child Task',
		description: 'Child Description',
		completed: false,
		priority: 'low',
		dueDate: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		assignedTo: 'user2',
		parentId: '1',
		tags: ['child'],
		profilePicture: 'child.jpg',
	};

	const mockTaskResponse: TaskResponse = {
		data: mockTask,
		message: 'Task created successfully',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TasksService, UtilityService, provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(TasksService);
		utilityService = TestBed.inject(UtilityService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get all tasks and transform them into a tree structure', () => {
		const mockTasks: Task[] = [mockTask, mockChildTask];
		const expectedTaskTree: TaskWithChildren[] = [
			{
				...mockTask,
				children: [
					{
						...mockChildTask,
						children: [],
					},
				],
			},
		];

		// Spy on the utility service's buildTaskTree method
		spyOn(utilityService, 'buildTaskTree').and.returnValue(expectedTaskTree);

		service.getTasks().subscribe((tasks) => {
			expect(tasks).toEqual(expectedTaskTree);
			expect(utilityService.buildTaskTree).toHaveBeenCalledWith(mockTasks);
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

	// Error handling tests
	it('should handle error when getting tasks fails', () => {
		const errorMessage = 'Server error';

		service.getTasks().subscribe({
			next: () => fail('Expected an error, not tasks'),
			error: (error) => {
				expect(error.status).toBe(500);
				expect(error.error).toBe(errorMessage);
			},
		});

		const req = httpMock.expectOne(`${API}/list`);
		req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
	});

	it('should handle error when creating a task fails', () => {
		const errorMessage = 'Invalid task data';
		const taskName = 'New Task';

		service.createTask(taskName).subscribe({
			next: () => fail('Expected an error, not a successful response'),
			error: (error) => {
				expect(error.status).toBe(400);
				expect(error.error).toBe(errorMessage);
			},
		});

		const req = httpMock.expectOne(API);
		req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
	});

	// Edge cases
	it('should handle empty task list', () => {
		const emptyTasks: Task[] = [];
		const emptyTaskTree: TaskWithChildren[] = [];

		spyOn(utilityService, 'buildTaskTree').and.returnValue(emptyTaskTree);

		service.getTasks().subscribe((tasks) => {
			expect(tasks).toEqual(emptyTaskTree);
			expect(tasks.length).toBe(0);
			expect(utilityService.buildTaskTree).toHaveBeenCalledWith(emptyTasks);
		});

		const req = httpMock.expectOne(`${API}/list`);
		req.flush(emptyTasks);
	});

	it('should handle task with invalid parent ID', () => {
		const taskWithInvalidParent: Task = {
			...mockChildTask,
			parentId: '999', // Non-existent parent ID
		};

		const mockTasks: Task[] = [mockTask, taskWithInvalidParent];
		const expectedTaskTree: TaskWithChildren[] = [
			{
				...mockTask,
				children: [],
			},
		];

		spyOn(utilityService, 'buildTaskTree').and.returnValue(expectedTaskTree);

		service.getTasks().subscribe((tasks) => {
			expect(tasks).toEqual(expectedTaskTree);
			expect(utilityService.buildTaskTree).toHaveBeenCalledWith(mockTasks);
		});

		const req = httpMock.expectOne(`${API}/list`);
		req.flush(mockTasks);
	});
});
