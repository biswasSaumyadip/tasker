import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface ToastMessage {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
	duration?: number;
}

@Component({
	selector: 'tasker-toaster',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './toaster.component.html',
	styleUrls: ['./toaster.component.scss'],
	animations: [
		trigger('toastAnimation', [
			state(
				'void',
				style({
					transform: 'translateX(100%)',
					opacity: 0,
				}),
			),
			state(
				'visible',
				style({
					transform: 'translateX(0)',
					opacity: 1,
				}),
			),
			transition('void => visible', animate('300ms ease-out')),
			transition('visible => void', animate('300ms ease-in')),
		]),
	],
})
export class ToasterComponent {
	private toasts = signal<ToastMessage[]>([]);
	position = signal<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('top-right');
	visibleToasts = computed(() => this.toasts());

	constructor() {
		// Clean up effect to remove toasts after their duration
		effect(() => {
			const currentToasts = this.toasts();
			if (currentToasts.length > 0) {
				currentToasts.forEach((toast) => {
					if (toast.duration) {
						setTimeout(() => {
							this.removeToast(toast.id);
						}, toast.duration);
					}
				});
			}
		});
	}

	addToast(toast: ToastMessage) {
		this.toasts.update((toasts) => [...toasts, toast]);
	}

	removeToast(id: string) {
		this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
	}

	getToastClass(type: string): string {
		switch (type) {
			case 'success':
				return 'toast-success';
			case 'error':
				return 'toast-error';
			case 'warning':
				return 'toast-warning';
			case 'info':
			default:
				return 'toast-info';
		}
	}

	getPositionClass(): string {
		return `toast-container-${this.position()}`;
	}
}
