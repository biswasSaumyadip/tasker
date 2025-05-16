import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
	let service: UtilityService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UtilityService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getDueDateStatus', () => {
		it('should return "past" for dates in the past', () => {
			// Create a date in the past
			const pastDate = new Date();
			pastDate.setDate(pastDate.getDate() - 1); // yesterday

			expect(service.getDueDateStatus(pastDate)).toBe('past');

			// Test a date further in the past
			const olderDate = new Date();
			olderDate.setDate(olderDate.getDate() - 10); // 10 days ago

			expect(service.getDueDateStatus(olderDate)).toBe('past');
		});

		it('should return "approaching" for dates within 3 days', () => {
			// Today
			const today = new Date();
			expect(service.getDueDateStatus(today)).toBe('approaching');

			// Tomorrow
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			expect(service.getDueDateStatus(tomorrow)).toBe('approaching');

			// 3 days from now
			const threeDaysFromNow = new Date();
			threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
			expect(service.getDueDateStatus(threeDaysFromNow)).toBe('approaching');
		});

		it('should return "future" for dates more than 3 days away', () => {
			// 4 days from now
			const fourDaysFromNow = new Date();
			fourDaysFromNow.setDate(fourDaysFromNow.getDate() + 4);
			expect(service.getDueDateStatus(fourDaysFromNow)).toBe('future');

			// Far future
			const farFuture = new Date();
			farFuture.setDate(farFuture.getDate() + 30); // 30 days from now
			expect(service.getDueDateStatus(farFuture)).toBe('future');
		});
	});
});
