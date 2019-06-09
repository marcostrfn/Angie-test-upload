import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';


@Component({
  selector: 'app-upload-angie',
  templateUrl: './upload-angie.component.html',
  styleUrls: ['./upload-angie.component.css'],

})
export class UploadAngieComponent implements OnInit {

  private MODEL_URL: string;
  private context: CanvasRenderingContext2D;
  

  constructor() {
    this.MODEL_URL = '/assets/models';

  }

  ngOnInit() {
    const elemento = document.createElement('canvas') as HTMLCanvasElement;
    this.context = elemento.getContext('2d');
    this.prepareFaceDetector();
  }


  private prepareFaceDetector(): void {
    const self = this;
    async function run() {
      console.log('Inicio carga de modelos FaceDetector');
      await faceapi.loadSsdMobilenetv1Model(self.MODEL_URL);
      await faceapi.loadFaceLandmarkModel(self.MODEL_URL);
      await faceapi.loadFaceRecognitionModel(self.MODEL_URL);
      await faceapi.loadFaceExpressionModel(self.MODEL_URL);
      await faceapi.loadAgeGenderModel(self.MODEL_URL);
      console.log('Fin carga de modelos FaceDetector');
    };
    run();
  }


  private onPropage(imgURL: string): void {
    const self = this;
    const imagenUpload = new Image();
    imagenUpload.onload = (() => {
      self.context.canvas.width = imagenUpload.width;
      self.context.canvas.height = imagenUpload.height;
      self.context.drawImage(imagenUpload, 0, 0);
      self.initDetector(imagenUpload);
    });
    imagenUpload.src = imgURL;
  }


  private initDetector(imagenUpload: any) : void{

    const self = this;

    async function run() {
      console.log('Inicio FaceDetector');
      let fullFaceDescriptions = await faceapi.detectAllFaces(imagenUpload)
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions()
        .withAgeAndGender();

      console.log(fullFaceDescriptions);

      // draw a textbox displaying the face expressions with minimum probability into the canvas
      const displaySize = { width: self.context.canvas.width, height: self.context.canvas.height }
      const resizedResults = faceapi.resizeResults(fullFaceDescriptions, displaySize);
      const minProbability = 0.05;

      faceapi.draw.drawFaceExpressions(self.context.canvas, resizedResults, minProbability);
      faceapi.draw.drawDetections(self.context.canvas, fullFaceDescriptions);

      // canvas a imagen

      const imageResult = document.getElementById('image-result') as HTMLImageElement;
      imageResult.src = self.context.canvas.toDataURL('image/jpg');

    }
    run()
  }

}
