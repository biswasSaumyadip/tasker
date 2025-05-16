import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TasksComponent', () => {
	let component: TasksComponent;
	let fixture: ComponentFixture<TasksComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TasksComponent],
			providers: [provideHttpClientTesting(), provideHttpClient()],
		}).compileComponents();

		fixture = TestBed.createComponent(TasksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
