import { TestBed } from '@angular/core/testing';

import { UiConfigService } from './ui-config.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('UiConfigService', () => {
	let service: UiConfigService;
	let httpClientMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClientTesting(), provideHttpClient()],
		});
		service = TestBed.inject(UiConfigService);
		httpClientMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpClientMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
