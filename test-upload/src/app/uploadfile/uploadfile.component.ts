import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { UploadFileService } from  './uploadfile.service';
import { JpegBase64 } from './jpegbase64.pipe';
import { MySafeUrl } from '../mysafeurl.pipe';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
  providers: [ JpegBase64 ]
})
export class UploadfileComponent implements OnInit {

  private title = "Upload";
  imagen: string;
  form: FormGroup;
  error: string;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '', data: '' };
  myUploadService: UploadFileService;
  routeImg: string;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadFileService, private jpegBase64: JpegBase64) {
        this.myUploadService = uploadService;
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      myfile: ['']
    });
  }

  onResponse(res) {
    this.uploadResponse = res;
    console.log(this.uploadResponse);
    if (this.uploadResponse.status=='upload') {
      this.routeImg = this.jpegBase64.transform(this.uploadResponse.data);
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('myfile').setValue(file);
    }
  }


  onSubmit() {
    console.log('enviando');
    const formData = new FormData();
    formData.append('file', this.form.get('myfile').value);

    this.myUploadService.upload(formData, this.userId).subscribe(
      (res) => this.onResponse(res),
      (err) => this.error = err
    );
  }



}
