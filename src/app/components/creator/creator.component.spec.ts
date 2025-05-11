import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatorComponent } from './creator.component';
import { testImports, testProviders } from '../../testing/test-helpers';

describe('CreatorComponent', () => {
	let component: CreatorComponent;
	let fixture: ComponentFixture<CreatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreatorComponent, ...testImports],
			providers: [...testProviders],
		}).compileComponents();

		fixture = TestBed.createComponent(CreatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
