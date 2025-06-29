import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PriorityBadgeDirective, PriorityLevel } from './priority-badge.directive';

@Component({
	template: ` <div taskerPriorityBadge [priority]="priority">Priority Badge</div> `,
	imports: [PriorityBadgeDirective],
	standalone: true,
})
class TestComponent {
	priority: PriorityLevel = 'medium';
}

describe('PriorityBadgeDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let divElement: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PriorityBadgeDirective, TestComponent],
			declarations: [],
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		divElement = fixture.debugElement.query(By.css('div'));
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		const directiveInstance = divElement.injector.get(PriorityBadgeDirective);
		expect(directiveInstance).toBeTruthy();
	});

	it('should add badge-error class for high priority', () => {
		component.priority = 'high';
		fixture.detectChanges();

		expect(divElement.nativeElement.classList.contains('badge')).toBeTruthy();
		expect(divElement.nativeElement.classList.contains('badge-error')).toBeTruthy();
		expect(divElement.nativeElement.classList.contains('badge-warning')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('badge-success')).toBeFalsy();
	});

	it('should add badge-warning class for medium priority', () => {
		component.priority = 'medium';
		fixture.detectChanges();

		expect(divElement.nativeElement.classList.contains('badge')).toBeTruthy();
		expect(divElement.nativeElement.classList.contains('badge-error')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('badge-warning')).toBeTruthy();
		expect(divElement.nativeElement.classList.contains('badge-success')).toBeFalsy();
	});

	it('should add badge-success class for low priority', () => {
		component.priority = 'low';
		fixture.detectChanges();

		expect(divElement.nativeElement.classList.contains('badge')).toBeTruthy();
		expect(divElement.nativeElement.classList.contains('badge-error')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('badge-warning')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('badge-success')).toBeTruthy();
	});

	it('should handle case-insensitive priority values', () => {
		// Using a non-standard case for 'high'
		component.priority = 'HIGH' as PriorityLevel;
		fixture.detectChanges();

		expect(divElement.nativeElement.classList.contains('badge-error')).toBeTruthy();
	});

	it('should not add any specific badge class for invalid priority', () => {
		// Using type assertion to bypass TypeScript type checking for test
		component.priority = 'invalid' as PriorityLevel;
		fixture.detectChanges();

		expect(divElement.nativeElement.classList.contains('badge')).toBeTruthy();
		expect(divElement.nativeElement.classList.contains('badge-error')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('badge-warning')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('badge-success')).toBeFalsy();
	});
});
