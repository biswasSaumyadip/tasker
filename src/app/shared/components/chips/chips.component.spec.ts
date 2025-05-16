import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { ChipsComponent } from './chips.component';

@Component({
  selector: 'test-host',
  standalone: true,
  imports: [ChipsComponent],
  template: `<tasker-chips [chips]="chipData" />`
})
class TestHostComponent {
  chipData = ['Angular', 'Signals', 'Testing'];
}

describe('ChipsComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
    const chipsComponent = hostFixture.debugElement.query(By.directive(ChipsComponent));
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
});
