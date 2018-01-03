import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true 
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true 
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() cols = 6;
  @Input() rowHeight = '64px';
  @Input() title = 'Select one';
  @Input() items: string[] = [];
  @Input() itemWidth = '80px';
  @Input() useSvgIcon = false;
  selected: string;

  constructor() { }

  private propogateChange = (_: any) => { };

  writeValue(obj: any): void {
    this.selected = obj;
    this.propogateChange(this.selected);
  }

  registerOnChange(fn: any): void {
    this.propogateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }


  onChange(i: number) {
    this.selected = this.items[i];
  }

  validate(c: FormControl) : {[key: string]: any}{
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    }
  }

}
