import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vrg-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})

export class AvatarComponent {
  @Input() isEditable: boolean = false;
  @Input() src?: string | null;
  @Output() change: EventEmitter<string> = new EventEmitter()

  loadAvatar() {
    if (!this.isEditable) return;

    const src = prompt("Introduce la URL de la imagen para el avatar");
    if (!src) return;

    this.change.emit(src);
  }
}
