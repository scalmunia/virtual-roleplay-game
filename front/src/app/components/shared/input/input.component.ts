import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vrg-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ]
})

export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  value: any;

  // ControlValueAccessor methods
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Emitir el evento valueChange cuando cambia el valor del input
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onTouched();
    this.onChange(value); // Notificar el cambio al formulario reactivo
  }
}
