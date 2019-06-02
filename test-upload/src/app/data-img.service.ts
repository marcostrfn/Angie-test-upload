import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataImgService {

  private dataUrl: string;

  constructor() { }

  setDataUrl(data: string): void {
    this.dataUrl = data;
  }

  getDataUrl(): string {
    return this.dataUrl;
  }
}
