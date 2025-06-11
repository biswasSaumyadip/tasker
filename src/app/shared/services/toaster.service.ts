import {
	ApplicationRef,
	ComponentRef,
	createComponent,
	EnvironmentInjector,
	inject,
	Injectable,
} from '@angular/core';
import { ToasterComponent, ToastMessage } from '../components/toaster/toaster.component';
import { v4 as UUID } from 'uuid';

@Injectable({
	providedIn: 'root',
})
export class ToasterService {
	private environmentInjector = inject(EnvironmentInjector);
	private appRef = inject(ApplicationRef);
	private toasterComponentRef: ComponentRef<ToasterComponent> | null = null;
	private defaultDuration = 5000; // 5 seconds

	constructor() {
		this.createToasterComponent();
	}

	private createToasterComponent(): void {
		// Create the toaster component dynamically
		const toasterComponentRef = createComponent(ToasterComponent, {
			environmentInjector: this.environmentInjector,
		});

		// Attach the component to the DOM
		document.body.appendChild(toasterComponentRef.location.nativeElement);

		// Attach the component to the application
		this.appRef.attachView(toasterComponentRef.hostView);

		// Store the component reference
		this.toasterComponentRef = toasterComponentRef;
	}

	/**
	 * Show a success toast message
	 * @param message The message to display
	 * @param duration Optional duration in milliseconds (defaults to 5000ms)
	 */
	showSuccess(message: string, duration: number = this.defaultDuration): void {
		this.showToast({
			id: UUID(),
			message,
			type: 'success',
			duration,
		});
	}

	/**
	 * Show an error toast message
	 * @param message The message to display
	 * @param duration Optional duration in milliseconds (defaults to 5000ms)
	 */
	showError(message: string, duration: number = this.defaultDuration): void {
		this.showToast({
			id: UUID(),
			message,
			type: 'error',
			duration,
		});
	}

	/**
	 * Show an info toast message
	 * @param message The message to display
	 * @param duration Optional duration in milliseconds (defaults to 5000ms)
	 */
	showInfo(message: string, duration: number = this.defaultDuration): void {
		this.showToast({
			id: UUID(),
			message,
			type: 'info',
			duration,
		});
	}

	/**
	 * Show a warning toast message
	 * @param message The message to display
	 * @param duration Optional duration in milliseconds (defaults to 5000ms)
	 */
	showWarning(message: string, duration: number = this.defaultDuration): void {
		this.showToast({
			id: UUID(),
			message,
			type: 'warning',
			duration,
		});
	}

	/**
	 * Set the position of the toaster
	 * @param position The position to set
	 */
	setPosition(position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'): void {
		if (this.toasterComponentRef) {
			this.toasterComponentRef.instance.position.set(position);
		}
	}

	private showToast(toast: ToastMessage): void {
		if (this.toasterComponentRef) {
			this.toasterComponentRef.instance.addToast(toast);
		}
	}
}
