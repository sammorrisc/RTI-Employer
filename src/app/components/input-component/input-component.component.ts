import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponentComponent {

}
