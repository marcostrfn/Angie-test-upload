import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  private imgURL: any;
  private message: string;
  private filename: string;
  private accept: any = /image\/*/; 
  // private accept: any =  /application\/pdf/;

  
  @Output()
  propagar = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  private onFileChange(files: any): void {
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    console.log(mimeType);

    if (mimeType.match(this.accept) == null) {
      this.message = "Formato de documento no admitido.";
      return;
    }

    this.filename = files[0].name;

    const reader = new FileReader();
    
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.propagar.emit(this.imgURL);
    }
  }


}




