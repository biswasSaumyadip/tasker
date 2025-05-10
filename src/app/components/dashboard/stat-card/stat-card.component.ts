import {ChangeDetectionStrategy, Component, input, InputSignal, Type} from '@angular/core';
import {CardModule} from 'primeng/card';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'tasker-stat-card', imports: [CardModule, NgComponentOutlet], template: `
    <p-card styleClass="dashboard__stats--layout" [style]="{ borderRadius: '8px'}">
      <div class="dashboard__stats--content">
        @if (icon()) {
          <ng-container *ngComponentOutlet="icon()"/>
        }
        <div class="dashboard__stats--text">
          <p class="dashboard__stats--name">{{ title() }}</p>
          <h5 class="dashboard__stats--count">{{ count() }}</h5>
        </div>
      </div>
    </p-card>
  `, styleUrl: './stat-card.component.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  title: InputSignal<string> = input<string>('');
  count: InputSignal<number> = input<number>(0);
  icon: InputSignal<Type<any> | null> = input<Type<any> | null>(null);
}
