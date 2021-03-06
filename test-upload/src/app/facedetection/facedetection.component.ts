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
    { value: '/assets/madrid.jpg', display: 'Madrid' },
    { value: '/assets/imagen02.jpg', display: 'Puto Barsa' },
    { value: '/assets/imagen2.jpg', display: 'dni 1' },
    { value: '/assets/imagen3.jpg', display: 'dni 2' },
    { value: '/assets/concierto.jpg', display: 'concierto' },
    { value: '/assets/equipochicas.jpg', display: 'equipo chicas' }
  ];

  constructor() {
    this.mostrarBoton = false;
    this.MODEL_URL = '/assets/models';
    this.imageInput = 'image-input';
    this.canvasInput = 'canvas-input';
  }

  ngOnInit() {
    let elemento = document.getElementById(this.canvasInput) as HTMLCanvasElement
    this.context = elemento.getContext('2d');
    this.prepareFaceDetector();

    this.prepareImg(this.imagenes[0].value);
  }


  private drawFace(): void {

    async function run(f: FacedetectionComponent) {

      console.log('Inicio FaceDetector');
      const input = f.imageInput;
      const mycanvas = f.canvasInput;

      let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
      console.log(fullFaceDescriptions);

      // dibujo de lineas en rostros detectados
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


      let x = 0;
      fullFaceDescriptions.forEach(fd => {

        let nueva = new Image();
        let div = document.getElementById("misCanvas");
        let nodeCanvas = document.createElement("canvas");
        const nombre = "canvas" + x++;
        console.log("nombre ", nombre)
        nodeCanvas.setAttribute('id', nombre);
        nodeCanvas.setAttribute('style', 'outline: black 3px solid;margin: 5px');
        div.appendChild(nodeCanvas);

        let elemento1 = document.getElementById(nombre) as HTMLCanvasElement
        let context1 = elemento1.getContext('2d');

        nueva.onload = (function (f: FacedetectionComponent, x: number, y: number, px: number, py: number) {
          return function () {
            context1.canvas.width = px;
            context1.canvas.height = py;
            context1.drawImage(nueva, x, y, px, py, 0, 0, px, py);

            // creamos una imagen nueva desde un canvas
            let image = new Image();
            image.setAttribute("class", "img-fluid img-thumbnail");
            image.src = context1.canvas.toDataURL();
            document.getElementById('misImagenes').appendChild(image);

          };
        })(f, fd.detection.box.x, fd.detection.box.y, fd.detection.box.width, fd.detection.box.height);
        nueva.src = f.imgscr;

      });

      // draw a textbox displaying the face expressions with minimum probability into the canvas
      const displaySize = { width: f.context.canvas.width, height: f.context.canvas.height };
      const resizedResults = faceapi.resizeResults(fullFaceDescriptions, displaySize);
      const minProbability = 0.05;
      faceapi.draw.drawFaceExpressions(mycanvas, resizedResults, minProbability);

      faceapi.draw.drawDetections(mycanvas, fullFaceDescriptions);
      console.log('Final FaceDetector');

    }
    run(this);
  }

  private prepareImg(value: string): void {
    this.myImg = new Image();
    this.imgscr = value;
    this.myImg.onload = (function (f: FacedetectionComponent) {
      return function () {
        f.context.canvas.width = f.myImg.width;
        f.context.canvas.height = f.myImg.height;
        f.context.drawImage(f.myImg, 0, 0);
      };
    })(this);
    this.myImg.src = this.imgscr;
  }


  private prepareFaceDetector(): void {
    async function run(f: FacedetectionComponent) {
      console.log('Inicio carga de modelos FaceDetector');
      await faceapi.loadSsdMobilenetv1Model(f.MODEL_URL);
      await faceapi.loadFaceLandmarkModel(f.MODEL_URL);
      await faceapi.loadFaceRecognitionModel(f.MODEL_URL);
      await faceapi.loadFaceExpressionModel(f.MODEL_URL);
      await faceapi.loadAgeGenderModel(f.MODEL_URL);
      console.log('Fin carga de modelos FaceDetector');
      f.mostrarBoton = true;
    };
    run(this);
  }

  private removeElement(elemento: HTMLElement): void {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }

  private onChangeImage(value: string): void {
    console.log(value);

    this.prepareImg(value);

    let divImg = document.getElementById("misImagenes");
    let div = document.getElementById("misCanvas");

    this.removeElement(divImg);
    this.removeElement(div);
  }


}
