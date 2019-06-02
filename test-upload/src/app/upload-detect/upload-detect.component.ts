import { Component, OnInit } from '@angular/core';
import { DataImgService } from '../data-img.service';

@Component({
  selector: 'app-upload-detect',
  templateUrl: './upload-detect.component.html',
  styleUrls: ['./upload-detect.component.css']
})
export class UploadDetectComponent implements OnInit {
  
  private myDataImgService: DataImgService;
  private imgData: string;

  constructor(private dataImgService: DataImgService) {
    this.myDataImgService = dataImgService;
   }

  ngOnInit() {
  }

  procesaPropagar(dataUrl) {
    console.log("recibido");
    this.imgData = dataUrl;
  }

  loadImg() {
    console.log('pulsado');
    let dataUrl = this.myDataImgService.getDataUrl();
    console.log(dataUrl);
    this.imgData = dataUrl;
  }

}
