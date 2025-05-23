import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('TopBarComponent', () => {
	let component: TopBarComponent;
	let fixture: ComponentFixture<TopBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TopBarComponent],
			providers: [provideHttpClientTesting(), provideHttpClient()],
		}).compileComponents();

		fixture = TestBed.createComponent(TopBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
