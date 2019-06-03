import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';


@Component({
  selector: 'app-upload-detect',
  templateUrl: './upload-detect.component.html',
  styleUrls: ['./upload-detect.component.css']
})
export class UploadDetectComponent implements OnInit {

  private context: CanvasRenderingContext2D;
  private canvasInput: string;
  private imageInput: string;
  private imgData: string;

  private canvasContainerResult:string;
  private imagenesContainerResult:string;
  

  private MODEL_URL: string;


  constructor() {
    this.MODEL_URL = '/assets/models';
    this.imageInput = 'image-input';
    this.canvasInput = 'canvas-input';
    this.canvasContainerResult = 'canvas-container-result';
    this.imagenesContainerResult = 'imagenes-container-result';
  }

  ngOnInit() {

    const elemento = document.getElementById(this.canvasInput) as HTMLCanvasElement
    this.context = elemento.getContext('2d');

    this.prepareFaceDetector();

  }

  private prepareFaceDetector(): void {
    async function run(self: UploadDetectComponent) {
      console.log('Inicio carga de modelos FaceDetector');
      await faceapi.loadSsdMobilenetv1Model(self.MODEL_URL);
      await faceapi.loadFaceLandmarkModel(self.MODEL_URL);
      await faceapi.loadFaceRecognitionModel(self.MODEL_URL);
      console.log('Fin carga de modelos FaceDetector');
    };
    run(this);
  }


  private prepareImg2Canvas(value: string): void {
    const myImagen = new Image();
    const self = this;
    myImagen.onload = (() => {
      self.context.canvas.width = myImagen.width;
      self.context.canvas.height = myImagen.height;
      self.context.drawImage(myImagen, 0, 0);
      self.drawFace();
    });
    myImagen.src = value;
  }


  procesaPropagar(dataUrl) {
    this.imgData = dataUrl;
    this.prepareImg2Canvas(dataUrl);
  }



  private drawFace(): void {

    const divImg = document.getElementById(this.imagenesContainerResult);
    const div = document.getElementById(this.canvasContainerResult);

    this.removeElement(divImg);
    this.removeElement(div);

    async function run(self: UploadDetectComponent) {

      console.log('Inicio FaceDetector');
      const input = self.imageInput;
      const mycanvas = self.canvasInput;

      console.log(input, mycanvas);

      let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
      console.log(fullFaceDescriptions);

      // dibujo de lineas en rostros detectados
      fullFaceDescriptions.forEach(fd => {
        self.context.beginPath();
        self.context.moveTo(fd.detection.box.x, fd.detection.box.y);
        self.context.lineTo(fd.detection.box.width + fd.detection.box.x, fd.detection.box.height + fd.detection.box.y);
        self.context.stroke();

        self.context.beginPath();
        self.context.moveTo(fd.detection.box.x + fd.detection.box.width / 2, fd.detection.box.y);
        self.context.lineTo(fd.detection.box.x + fd.detection.box.width / 2, fd.detection.box.y + fd.detection.box.height);
        self.context.stroke();

        self.context.beginPath();
        self.context.moveTo(fd.detection.box.x, fd.detection.box.y + fd.detection.box.height / 2);
        self.context.lineTo(fd.detection.box.x + fd.detection.box.width, fd.detection.box.y + fd.detection.box.height / 2);
        self.context.stroke();
      });


      let x = 0;
      fullFaceDescriptions.forEach(fd => {

        const nueva = new Image();
        const div = document.getElementById(self.canvasContainerResult);
        const nodeCanvas = document.createElement('canvas');
        const nombre = 'canvas' + x++;
        console.log('nombre ', nombre)
        nodeCanvas.setAttribute('id', nombre);
        nodeCanvas.setAttribute('style', 'outline: black 3px solid;margin: 5px');
        div.appendChild(nodeCanvas);

        const elemento1 = document.getElementById(nombre) as HTMLCanvasElement
        const context1 = elemento1.getContext('2d');

        nueva.onload = (function (self: UploadDetectComponent, x: number, y: number, px: number, py: number) {
          return function () {
            context1.canvas.width = px;
            context1.canvas.height = py;
            context1.drawImage(nueva, x, y, px, py, 0, 0, px, py);

            // creamos una imagen nueva desde un canvas
            const image = new Image();
            image.setAttribute('class', 'd-none img-fluid img-thumbnail');
            image.src = context1.canvas.toDataURL();
            document.getElementById(self.imagenesContainerResult).appendChild(image);

          };
        })(self, fd.detection.box.x, fd.detection.box.y, fd.detection.box.width, fd.detection.box.height);
        nueva.src = self.imgData;

      });

      faceapi.draw.drawDetections(mycanvas, fullFaceDescriptions);
      console.log('Final FaceDetector');

    }
    run(this);
  }

  private removeElement(elemento: HTMLElement): void {
    console.log(elemento);
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }


}
