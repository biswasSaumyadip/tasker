import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { API_URL } from './shared/tokens/api-url-injection-token';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideHttpClient(),
		provideAnimations(),
		{ provide: API_URL, useValue: environment.apiUrl },
		// provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: Material,
				options: {
					darkModeSelector: 'none',
				},
			},
		}),
	],
};
