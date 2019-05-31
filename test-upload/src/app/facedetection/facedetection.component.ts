import { Component, OnInit } from '@angular/core';
import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';
import { parseIntAutoRadix } from '@angular/common/src/i18n/format_number';
import { bloomHasToken } from '@angular/core/src/render3/di';
import { FaceDetection } from 'face-api.js';


export interface Imagenes {
  value: string;
  display: string;
}

@Component({
  selector: 'app-facedetection',
  templateUrl: './facedetection.component.html',
  styleUrls: ['./facedetection.component.css']
})
export class FacedetectionComponent implements OnInit {

  private context: CanvasRenderingContext2D;
  private MODEL_URL: string;
  private imgscr: string;
  private myImg;
  private mostrarBoton: boolean;
  private imageInput: string;
  private canvasInput: string;

  selectedValue: string;
  imagenes: Imagenes[] = [
    { value: '/assets/equipoa.jpg', display: 'equipo A' },
    { value: '/assets/imagen02.jpg', display: 'Barsa' },
    { value: '/assets/imagen2.jpg', display: 'dni 1' },
    { value: '/assets/imagen3.jpg', display: 'dni 2' }
  ];

  constructor() {
    this.mostrarBoton = false;
    this.MODEL_URL = '/assets/models';
    this.imageInput = 'image-input';
    this.canvasInput = 'canvas-input';
    this.myImg = new Image();
    this.imgscr = this.imagenes[0].value;
    
  }



  ngOnInit() {
    let elemento = document.getElementById(this.canvasInput) as HTMLCanvasElement
    this.context = elemento.getContext('2d');
    this.prepareImg();
    this.prepareFaceDetector();
  }


  private drawFace() {

    this.mostrarBoton = false;

    async function run(f: FacedetectionComponent) {

      console.log('Inicio FaceDetector');
      const input = f.imageInput;
      const mycanvas = f.canvasInput;

      let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
      console.log(fullFaceDescriptions);

      fullFaceDescriptions.forEach(fd => {
        f.context.beginPath();
        f.context.moveTo(fd.detection.box.x, fd.detection.box.y);
        f.context.lineTo(fd.detection.box.width + fd.detection.box.x, fd.detection.box.height + fd.detection.box.y);
        f.context.stroke();

        f.context.beginPath();
        f.context.moveTo(fd.detection.box.x + fd.detection.box.width / 2, fd.detection.box.y);
        f.context.lineTo(fd.detection.box.x + fd.detection.box.width / 2, fd.detection.box.y + fd.detection.box.height);
        f.context.stroke();

        f.context.beginPath();
        f.context.moveTo(fd.detection.box.x, fd.detection.box.y + fd.detection.box.height / 2);
        f.context.lineTo(fd.detection.box.x + fd.detection.box.width, fd.detection.box.y + fd.detection.box.height / 2);
        f.context.stroke();
      });

      faceapi.draw.drawDetections(mycanvas, fullFaceDescriptions);
      console.log('Final FaceDetector');
      f.mostrarBoton = true;
    }
    run(this);
  }

  private prepareImg() {
    this.myImg.onload = (function (f: FacedetectionComponent) {
      return function () {
        f.context.canvas.width = f.myImg.width;
        f.context.canvas.height = f.myImg.height;
        f.context.drawImage(f.myImg, 0, 0);
      };
    })(this);
    this.myImg.src = this.imgscr;
  }


  private prepareFaceDetector() {
    async function run(f: FacedetectionComponent) {
      console.log('Inicio carga de modelos FaceDetector');
      await faceapi.loadSsdMobilenetv1Model(f.MODEL_URL);
      await faceapi.loadFaceLandmarkModel(f.MODEL_URL);
      await faceapi.loadFaceRecognitionModel(f.MODEL_URL);
      console.log('Fin carga de modelos FaceDetector');
      f.mostrarBoton = true;
    };
    run(this);
  }

  onChangeImage(value: string) {
    console.log(value);
    this.myImg = new Image();
    this.imgscr = value;
    this.prepareImg();
    // this.prepareFaceDetector();
  }


}
