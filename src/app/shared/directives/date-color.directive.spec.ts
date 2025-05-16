import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateColorDirective } from './date-color.directive';
import { UtilityService } from '../services/utility.service';

@Component({
	template: ` <div taskerDateColor [dueDate]="dueDate">Test Date</div> `,
	imports: [DateColorDirective],
	standalone: true,
})
class TestComponent {
	dueDate: Date = new Date();
}

describe('DateColorDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let divElement: DebugElement;
	let utilityServiceSpy: jasmine.SpyObj<UtilityService>;

	beforeEach(async () => {
		// Create a spy for UtilityService
		const spy = jasmine.createSpyObj('UtilityService', ['getDueDateStatus']);

		await TestBed.configureTestingModule({
			declarations: [],
			imports: [DateColorDirective, TestComponent],
			providers: [{ provide: UtilityService, useValue: spy }],
		}).compileComponents();

		utilityServiceSpy = TestBed.inject(UtilityService) as jasmine.SpyObj<UtilityService>;

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		divElement = fixture.debugElement.query(By.css('div'));
	});

	it('should create an instance', () => {
		const directiveEl = fixture.debugElement.query(By.directive(DateColorDirective));
		expect(directiveEl).toBeTruthy();

		const directiveInstance = directiveEl.injector.get(DateColorDirective);
		expect(directiveInstance).toBeTruthy();
	});

	it('should add past-due class when date is in the past', () => {
		// Set up the utility service to return 'past'
		utilityServiceSpy.getDueDateStatus.and.returnValue('past');

		// Set a past date
		const pastDate = new Date();
		pastDate.setDate(pastDate.getDate() - 1);
		component.dueDate = pastDate;

		fixture.detectChanges();

		// Check that the past-due class is added
		expect(divElement.nativeElement.classList.contains('date-past-due')).toBeTruthy();
		expect(divElement.nativeElement.classList.contains('date-approaching-due')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('date-future-due')).toBeFalsy();
	});

	it('should add approaching-due class when date is approaching', () => {
		// Set up the utility service to return 'approaching'
		utilityServiceSpy.getDueDateStatus.and.returnValue('approaching');

		// Set an approaching date
		const approachingDate = new Date();
		approachingDate.setDate(approachingDate.getDate() + 1);
		component.dueDate = approachingDate;

		fixture.detectChanges();

		// Check that the approaching-due class is added
		expect(divElement.nativeElement.classList.contains('date-past-due')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('date-approaching-due')).toBeTruthy();
		expect(divElement.nativeElement.classList.contains('date-future-due')).toBeFalsy();
	});

	it('should add future-due class when date is in the future', () => {
		// Set up the utility service to return 'future'
		utilityServiceSpy.getDueDateStatus.and.returnValue('future');

		// Set a future date
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 10);
		component.dueDate = futureDate;

		fixture.detectChanges();

		// Check that the future-due class is added
		expect(divElement.nativeElement.classList.contains('date-past-due')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('date-approaching-due')).toBeFalsy();
		expect(divElement.nativeElement.classList.contains('date-future-due')).toBeTruthy();
	});

	it('should handle string dates', () => {
		// Set up the utility service to return 'future'
		utilityServiceSpy.getDueDateStatus.and.returnValue('future');

		// Set a date string
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 10);
		component.dueDate = new Date(futureDate.toISOString());

		fixture.detectChanges();

		// Check that the future-due class is added
		expect(divElement.nativeElement.classList.contains('date-future-due')).toBeTruthy();
	});
});
