import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-angie-pdf',
  templateUrl: './upload-angie-pdf.component.html',
  styleUrls: ['./upload-angie-pdf.component.css']
})
export class UploadAngiePdfComponent implements OnInit {

  private context: CanvasRenderingContext2D;
  private context2: CanvasRenderingContext2D;


  constructor() {

  }

  ngOnInit() {
    const elemento = document.createElement('canvas') as HTMLCanvasElement;
    this.context = elemento.getContext('2d');
  }

  private onPropage(pdfBase64: string): void {
    console.log('Recibido onPropage');
    console.log(pdfBase64);

  }


}
