import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { JpegBase64 } from './jpegbase64.pipe';
import { UploadImageService } from './upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  providers: [ JpegBase64 ]
})
export class UploadImageComponent implements OnInit {


  imagen: string;
  form: FormGroup;
  error: string;
  uploadResponse = { status: '', message: '', filePath: '', data: '' };
  myUploadService: UploadImageService;
  routeImg: string;


  @Output()
  propagar = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder, private uploadService: UploadImageService,
              private jpegBase64: JpegBase64) {
        this.myUploadService = uploadService;
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      myfile: ['']
    });
  }

  onResponse(res) {
    this.uploadResponse = res;
    if (this.uploadResponse.status=='upload') {
      this.routeImg = this.jpegBase64.transform(this.uploadResponse.data);
      this.propagar.emit(this.routeImg);
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {


      console.log('pinchado');
      this.error = '';
      const file = event.target.files[0];
      this.form.get('myfile').setValue(file);
    }
  }


  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('myfile').value);
    this.myUploadService.upload(formData).subscribe(
      (res) => this.onResponse(res),
      (err) => this.error = err
    );
  }


}


