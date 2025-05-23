import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ChipsComponent } from './chips.component';

@Component({
	selector: 'test-host',
	standalone: true,
	imports: [ChipsComponent],
	template: `<tasker-chips [(chips)]="chipData" (chipsChange)="onChipsChange($event)" />`,
})
class TestHostComponent {
	chipData = ['Angular', 'Signals', 'Testing'];

	onChipsChange(chips: string[]) {
		this.chipData = chips;
	}
}

@Component({
	selector: 'view-mode-test-host',
	standalone: true,
	imports: [ChipsComponent],
	template: `<tasker-chips [(chips)]="chipData" [editable]="false" />`,
})
class ViewModeTestHostComponent {
	chipData = ['Angular', 'Signals', 'Testing'];
}

describe('ChipsComponent', () => {
	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;
	let chipsComponent: ChipsComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent],
		}).compileComponents();

		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		hostFixture.detectChanges();

		const chipsDebugElement = hostFixture.debugElement.query(By.directive(ChipsComponent));
		chipsComponent = chipsDebugElement.componentInstance;
	});

	it('should create', () => {
		expect(hostComponent).toBeTruthy();
		expect(chipsComponent).toBeTruthy();
	});

	it('should render chips based on input array', () => {
		// Get all chip elements
		const chipElements = hostFixture.debugElement.queryAll(By.css('.chip'));

		// Verify the number of chips matches the input array
		expect(chipElements.length).toBe(hostComponent.chipData.length);

		// Verify the content of each chip
		chipElements.forEach((chip, index) => {
			const chipText = chip.query(By.css('.chip__text')).nativeElement.textContent.trim();
			expect(chipText).toBe(hostComponent.chipData[index]);
		});
	});

	it('should add a chip when Enter is pressed with input value', () => {
		// Set input value
		const testValue = 'New Chip';
		chipsComponent.inputValue.set(testValue);

		// Simulate Enter key press
		const keyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
		chipsComponent.onKeyDown(keyboardEvent);
		hostFixture.detectChanges();

		// Verify the chip was added
		const chipElements = hostFixture.debugElement.queryAll(By.css('.chip'));
		expect(chipElements.length).toBe(hostComponent.chipData.length);
		expect(hostComponent.chipData).toContain(testValue);

		// Verify input was cleared
		expect(chipsComponent.inputValue()).toBe('');
	});

	it('should remove a chip when the remove icon is clicked', () => {
		// Get initial chip count
		const initialChipCount = hostComponent.chipData.length;
		const chipToRemove = hostComponent.chipData[0];

		// Find and click the remove icon of the first chip
		const removeIcon = hostFixture.debugElement.query(By.css('.chip__remove'));
		removeIcon.nativeElement.click();
		hostFixture.detectChanges();

		// Verify the chip was removed
		const chipElements = hostFixture.debugElement.queryAll(By.css('.chip'));
		expect(chipElements.length).toBe(initialChipCount - 1);
		expect(hostComponent.chipData).not.toContain(chipToRemove);
	});
});

describe('ChipsComponent in view mode', () => {
	let viewModeHostComponent: ViewModeTestHostComponent;
	let viewModeHostFixture: ComponentFixture<ViewModeTestHostComponent>;
	let viewModeChipsComponent: ChipsComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ViewModeTestHostComponent],
		}).compileComponents();

		viewModeHostFixture = TestBed.createComponent(ViewModeTestHostComponent);
		viewModeHostComponent = viewModeHostFixture.componentInstance;
		viewModeHostFixture.detectChanges();

		const chipsDebugElement = viewModeHostFixture.debugElement.query(By.directive(ChipsComponent));
		viewModeChipsComponent = chipsDebugElement.componentInstance;
	});

	it('should create in view mode', () => {
		expect(viewModeHostComponent).toBeTruthy();
		expect(viewModeChipsComponent).toBeTruthy();
		expect(viewModeChipsComponent.editable()).toBeFalse();
	});

	it('should not render input field in view mode', () => {
		const inputElement = viewModeHostFixture.debugElement.query(By.css('tasker-input'));
		expect(inputElement).toBeNull();
	});

	it('should not render remove buttons in view mode', () => {
		const removeButtons = viewModeHostFixture.debugElement.queryAll(By.css('.chip__remove'));
		expect(removeButtons.length).toBe(0);
	});

	it('should apply view-mode class to container in view mode', () => {
		const container = viewModeHostFixture.debugElement.query(By.css('.chips-container'));
		expect(container.classes['view-mode']).toBeTrue();
	});
});
