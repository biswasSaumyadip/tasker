import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import './scripts/string-utils';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
