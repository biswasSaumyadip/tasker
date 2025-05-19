import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateComponent } from './task-create.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('TaskCreateComponent', () => {
	let component: TaskCreateComponent;
	let fixture: ComponentFixture<TaskCreateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TaskCreateComponent],
			providers: [provideAnimations()],
		}).compileComponents();

		fixture = TestBed.createComponent(TaskCreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
