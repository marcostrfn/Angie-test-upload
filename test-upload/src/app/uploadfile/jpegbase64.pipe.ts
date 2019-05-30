import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'jpegBase64' })
export class JpegBase64 implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(html) {
    return "data:image/jpeg;base64," + html;
  }
}

