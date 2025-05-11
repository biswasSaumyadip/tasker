import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { testImports, testProviders } from '../../testing/test-helpers';

describe('CalendarComponent', () => {
	let component: CalendarComponent;
	let fixture: ComponentFixture<CalendarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CalendarComponent, ...testImports],
			providers: [...testProviders],
		}).compileComponents();

		fixture = TestBed.createComponent(CalendarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
