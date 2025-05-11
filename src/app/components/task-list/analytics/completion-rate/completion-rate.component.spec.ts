import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionRateComponent } from './completion-rate.component';

describe('CompletionRateComponent', () => {
	let component: CompletionRateComponent;
	let fixture: ComponentFixture<CompletionRateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CompletionRateComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CompletionRateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
