import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JpegBase64 } from './jpegbase64.pipe';
import { UploadImageService } from './upload-image.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-navbar-upload',
  templateUrl: './navbar-upload.component.html',
  styleUrls: ['./navbar-upload.component.css'],
  providers: [JpegBase64]
})
export class NavbarUploadComponent implements OnInit {


  imagen: string;
  form: FormGroup;
  error: string;
  uploadResponse = { status: '', message: '', filePath: '', data: '' };
  myUploadService: UploadImageService;
  routeImg: string;
  filename: string;

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
    if (this.uploadResponse.status == 'upload') {
      this.routeImg = this.jpegBase64.transform(this.uploadResponse.data);
      this.propagar.emit(this.routeImg);
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.error = '';
      const file = event.target.files[0];
      this.filename = file.name;
      this.form.get('myfile').setValue(file);
      this.onSubmit();
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

  onClick() {
    this.error = '';
  }


}
