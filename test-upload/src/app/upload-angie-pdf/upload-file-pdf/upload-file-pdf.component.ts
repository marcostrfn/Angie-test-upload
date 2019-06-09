import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadFilePdfService } from './upload-file-pdf.service';
import { GetBase64 } from './getBase64.pipe';


export interface DataImagenes {
  filename: string;
  encodedData: string;
}

@Component({
  selector: 'app-upload-file-pdf',
  templateUrl: './upload-file-pdf.component.html',
  styleUrls: ['./upload-file-pdf.component.css'],
  providers: [ GetBase64 ]
})
export class UploadFilePdfComponent implements OnInit {

  private pdfResponse: string;
  private filename: string;
  private accept: any =  /application\/pdf/;

  private form: FormGroup;
  private myUploadService: UploadFilePdfService;
  private uploadResponse = { status: '', message: '', filePath: '', data: '' };
  private error: string;
  private userId: number = 1;

  @Output()
  propagar = new EventEmitter<string>();

  constructor(private getBase64: GetBase64, private formBuilder: FormBuilder, private uploadService: UploadFilePdfService,) { 
    this.myUploadService = uploadService;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      myfile: ['']
    });
  }


  private onResponse(res): void {
    this.uploadResponse = res;
    // console.log(this.uploadResponse);
    
    if (this.uploadResponse.status=='upload') {
      console.log(this.uploadResponse.data);

      console.log(this.uploadResponse.data.length);
      for (let i=0;i<this.uploadResponse.data.length;i++) {

        const datos: any = this.uploadResponse.data[i];

        const dataImagenes: DataImagenes = {
          filename : datos.filename,
          encodedData : this.getBase64.transform(datos.data)
        };
        
        console.log(dataImagenes);

      }

      this.pdfResponse = this.getBase64.transform(this.uploadResponse.data);
      
      console.log('propagar');
      this.propagar.emit(this.pdfResponse);
    }
  }

  private onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('myfile').setValue(file);
      this.onSubmit();
    }
  }


  private onSubmit(): void {
    console.log('enviando');
    const formData = new FormData();
    formData.append('file', this.form.get('myfile').value);

    this.myUploadService.upload(formData, this.userId).subscribe(
      (res) => this.onResponse(res),
      (err) => this.error = err
    );
  }

}
