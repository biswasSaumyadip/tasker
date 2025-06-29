import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { environment } from '../../environments/environment';
import { Task, TaskDetail, TaskResponse, TaskWithChildren } from '../models/task.model';
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

	const mockTaskResponse: TaskResponse<Task> = {
		data: mockTask,
		message: 'Task created successfully',
		errors: '',
		status: 'success',
		errorCode: '',
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

		const mockTaskResponse: TaskResponse<Task[]> = {
			data: mockTasks,
			message: 'Task created successfully',
			errors: '',
			status: 'success',
			errorCode: '',
		};

		// Spy on the utility service's buildTaskTree method
		spyOn(utilityService, 'buildTaskTree').and.returnValue(expectedTaskTree);

		service.getTasks().subscribe((tasks) => {
			expect(tasks).toEqual(expectedTaskTree);
			expect(utilityService.buildTaskTree).toHaveBeenCalledWith(mockTasks);
		});

		const req = httpMock.expectOne(`${API}/list`);
		expect(req.request.method).toBe('GET');
		req.flush(mockTaskResponse);
	});

	it('should create a task with FormData', () => {
		const formData = new FormData();
		formData.append('title', 'Test Task');
		formData.append('description', 'Test Description');

		const mockTaskResponse: TaskResponse<string> = {
			data: 'success',
			message: 'Task created successfully',
			errors: '',
			status: 'success',
			errorCode: '',
		};

		service.createTask(formData).subscribe((response) => {
			return expect(response).toEqual(mockTaskResponse);
		});

		const req = httpMock.expectOne(API);
		expect(req.request.method).toBe('POST');
		// FormData is not directly comparable, so we check if it's an instance of FormData
		expect(req.request.body instanceof FormData).toBeTrue();
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

		const dummyTaskDetail: TaskDetail = {
			id: 'task-001',
			title: 'Finish unit tests',
			description: 'Write unit tests for the TaskService module',
			assignedTo: 'user-123',
			parentId: 'parent-001',

			completed: false,
			priority: 'MEDIUM',

			dueDate: '2025-06-30T12:00:00Z',
			tags: ['backend', 'testing'],
			assignedToName: 'lucas',

			attachments: [
				{
					url: 'https://example.com/attachment1.pdf',
					fileName: 'test-plan.pdf',
					fileType: 'application/pdf',
					uploadedAt: '2025-06-15T10:00:00Z',
				},
			],

			teamMembers: ['user-123', 'user-456'],
		};
		const response: TaskResponse<TaskDetail> = new TaskResponse();
		response.data = dummyTaskDetail;

		service.getTask(taskId).subscribe((task) => {
			expect(task).toEqual(dummyTaskDetail);
		});

		const req = httpMock.expectOne(`${API}/${taskId}`);
		expect(req.request.method).toBe('GET');
		req.flush(response);
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
		const formData = new FormData();
		formData.append('title', 'Invalid Task');

		service.createTask(formData).subscribe({
			next: () => fail('Expected an error, not a successful response'),
			error: (error) => {
				expect(error.status).toBe(400);
				expect(error.error).toBe(errorMessage);
			},
		});

		const req = httpMock.expectOne(API);
		req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
	});

	it('should create a task with all fields', () => {
		const formData = new FormData();
		formData.append('title', 'Complete Task');
		formData.append('description', 'Detailed description');
		formData.append('priority', 'high');
		formData.append('dueDate', '2023-12-31');
		formData.append('assignedTo', 'user123');
		formData.append('parentId', '1');
		formData.append('tags', JSON.stringify(['important', 'urgent']));

		const mockResponse: TaskResponse<string> = {
			data: 'task-id-123',
			message: 'Task created successfully',
			errors: '',
			status: 'success',
			errorCode: '',
		};

		service.createTask(formData).subscribe((response) => {
			expect(response).toEqual(mockResponse);
		});

		const req = httpMock.expectOne(API);
		expect(req.request.method).toBe('POST');
		expect(req.request.body instanceof FormData).toBeTrue();
		req.flush(mockResponse);
	});

	it('should create a task with file attachment', () => {
		const formData = new FormData();
		formData.append('title', 'Task with File');
		formData.append('description', 'Task with file attachment');

		// Mock file
		const file = new File(['dummy content'], 'test-file.pdf', { type: 'application/pdf' });
		formData.append('file', file);

		const mockResponse: TaskResponse<string> = {
			data: 'task-id-456',
			message: 'Task with file created successfully',
			errors: '',
			status: 'success',
			errorCode: '',
		};

		service.createTask(formData).subscribe((response) => {
			expect(response).toEqual(mockResponse);
		});

		const req = httpMock.expectOne(API);
		expect(req.request.method).toBe('POST');
		expect(req.request.body instanceof FormData).toBeTrue();
		req.flush(mockResponse);
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

		const mockTaskResponse: TaskResponse<Task[]> = {
			data: [] as Task[],
			message: 'Task created successfully',
			errors: '',
			status: 'success',
			errorCode: '',
		};

		const req = httpMock.expectOne(`${API}/list`);
		req.flush(mockTaskResponse);
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

		const mockTaskResponseHavingNull: TaskResponse<Task[]> = {
			data: mockTasks,
			message: 'Task created successfully',
			errors: '',
			status: 'success',
			errorCode: '',
		};

		spyOn(utilityService, 'buildTaskTree').and.returnValue(expectedTaskTree);

		service.getTasks().subscribe((tasks) => {
			expect(tasks).toEqual(expectedTaskTree);
			expect(utilityService.buildTaskTree).toHaveBeenCalledWith(mockTasks);
		});

		const req = httpMock.expectOne(`${API}/list`);
		req.flush(mockTaskResponseHavingNull);
	});

	it('Should delete a task based on ID and return the Success status', () => {
		const mockResponse: TaskResponse<string> = {
			data: '',
			message: 'Task delete successful',
			errors: '',
			status: 'success',
			errorCode: '',
		};

		const taskId = '1';

		service.deleteTask(taskId).subscribe((resp) => {
			expect(resp).toEqual(mockResponse);
		});

		const req = httpMock.expectOne(`${API}/${taskId}`);
		expect(req.request.method).toBe('DELETE');
		req.flush(mockResponse);
	});
});
