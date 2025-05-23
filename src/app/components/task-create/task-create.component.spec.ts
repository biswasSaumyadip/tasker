import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateComponent } from './task-create.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TaskCreateComponent', () => {
	let component: TaskCreateComponent;
	let fixture: ComponentFixture<TaskCreateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TaskCreateComponent],
			providers: [provideAnimations(), provideHttpClient(), provideHttpClientTesting()],
		}).compileComponents();

		fixture = TestBed.createComponent(TaskCreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
