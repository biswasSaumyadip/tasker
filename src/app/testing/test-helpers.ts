import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

@Component({ selector: 'test-empty', template: '' })
export class EmptyComponent {}

export const mockActivatedRoute = {
	snapshot: {
		paramMap: new Map<string, string>(),
		queryParamMap: new Map<string, string>(),
	},
	paramMap: of(new Map<string, string>()),
	queryParamMap: of(new Map<string, string>()),
	params: of({}),
	queryParams: of({}),
	url: new BehaviorSubject([]),
};

export const testImports = [RouterModule, HttpClientModule];
export const testProviders = [
	{ provide: ActivatedRoute, useValue: mockActivatedRoute },
	HttpClient,
];
