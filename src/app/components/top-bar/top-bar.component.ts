import { Component } from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {SearchIconComponent} from '../icons/search-icon.component';

@Component({
  selector: 'tasker-top-bar',
  imports: [
    InputText,
    SearchIconComponent
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  host: {'[style.width]': "'100%'", '[style.height]': "'100%'", '[style.display]': "'block'"}
})
export class TopBarComponent {

}
