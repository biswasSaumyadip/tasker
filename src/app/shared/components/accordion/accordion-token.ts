import { InjectionToken } from '@angular/core';

export interface AccordionRef {
	closeOthers(skipItem?: string): void;
}

export const ACCORDION_TOKEN = new InjectionToken<AccordionRef>('ACCORDION_TOKEN');
