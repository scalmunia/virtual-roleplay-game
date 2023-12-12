import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vrg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() color: 'primary' | 'secondary' | 'danger' | null = null;
  @Input() variant: 'default' | 'ghost' = 'default';

  backgroundColor: string = '';
}
