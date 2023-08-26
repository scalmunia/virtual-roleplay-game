import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vrg-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})

export class SelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() options: { value: string, label: string }[] = [];
  value: any = '';

  // ControlValueAccessor methods
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void {
    console.log('writeValue', value)
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Emitir el evento valueChange cuando cambia el valor del option
  onOptionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    console.log('onOptionChange', value)
    this.value = value;
    this.onTouched();
    this.onChange(value); // Notificar el cambio al formulario reactivo
  }
}
