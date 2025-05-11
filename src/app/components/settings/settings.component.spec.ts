import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { testImports, testProviders } from '../../testing/test-helpers';

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SettingsComponent, ...testImports],
			providers: [...testProviders],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
