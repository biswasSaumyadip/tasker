import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
	template: `
		<tasker-task-form>
			<div save>
				<button #saveButton>Save</button>
			</div>
		</tasker-task-form>
	`,
	imports: [TaskFormComponent],
})
class TestHostComponent {}

describe('TaskFormComponent', () => {
	let component: TaskFormComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TaskFormComponent, TestHostComponent],
			providers: [provideAnimations(), provideHttpClient(), provideHttpClientTesting()],
		}).compileComponents();

		hostFixture = TestBed.createComponent(TestHostComponent);
		hostFixture.detectChanges(); // triggers ngAfterContentInit

		const taskFormDebugEl = hostFixture.debugElement.query(By.directive(TaskFormComponent));
		component = taskFormDebugEl.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
