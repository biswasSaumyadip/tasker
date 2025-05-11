import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { testImports, testProviders } from './testing/test-helpers';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent, ...testImports],
			providers: [...testProviders],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have the 'frontend' title`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('frontend');
	});
	it('should render the layout component', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('tasker-layout')).toBeTruthy();
	});
});
