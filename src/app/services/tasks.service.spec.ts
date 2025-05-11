import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { testImports, testProviders } from '../testing/test-helpers';

describe('TasksService', () => {
	let service: TasksService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...testImports],
			providers: [TasksService, ...testProviders],
		});
		service = TestBed.inject(TasksService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
