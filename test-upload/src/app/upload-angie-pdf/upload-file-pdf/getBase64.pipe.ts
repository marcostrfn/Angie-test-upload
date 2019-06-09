import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'getBase64' })
export class GetBase64 implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(html) {
    return "data:application/pdf;base64," + html;
  }
}
