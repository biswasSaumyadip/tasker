import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('TaskListComponent', () => {
	let component: TaskListComponent;
	let fixture: ComponentFixture<TaskListComponent>;
	let routerOutlet: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TaskListComponent],
			providers: [provideHttpClientTesting(), provideHttpClient()],
		}).compileComponents();

		fixture = TestBed.createComponent(TaskListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		routerOutlet = TestBed.inject(Router);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		expect(routerOutlet).toBeTruthy();
	});
});
