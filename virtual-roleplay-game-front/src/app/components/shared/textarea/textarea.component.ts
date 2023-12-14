import { Component, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vrg-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})

export class TextareaComponent implements ControlValueAccessor {
  @ViewChild('textarea', { static: false }) textarea?: ElementRef;

  @Input() label: string = '';
  @Input() id: string = '';
  value: any = '';

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

  // Emitir el evento valueChange cuando cambia el valor del option
  onInputChange(event: Event): void {
    const textarea = this.textarea?.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';

    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onTouched();
    this.onChange(value); // Notificar el cambio al formulario reactivo
  }
}
