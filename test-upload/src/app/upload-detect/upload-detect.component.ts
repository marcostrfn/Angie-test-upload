import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';
import { min } from 'rxjs/operators';
import { SelectorFlags } from '@angular/compiler/src/core';
import { FaceDetection } from 'face-api.js';


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

  private canvasContainerResult: string;
  private imagenesContainerResult: string;


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
      await faceapi.loadFaceExpressionModel(self.MODEL_URL);
      await faceapi.loadAgeGenderModel(self.MODEL_URL);
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


  procesaPropagar(dataUrl: string): void {
    this.imgData = dataUrl;
    this.prepareImg2Canvas(dataUrl);
  }

  private drawLineFace(f: any, ctx: CanvasRenderingContext2D): void {
    // dibujo de lineas en rostros detectados
    f.forEach(fd => {
      ctx.beginPath();
      ctx.moveTo(fd.detection.box.x, fd.detection.box.y);
      ctx.lineTo(fd.detection.box.width + fd.detection.box.x, fd.detection.box.height + fd.detection.box.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(fd.detection.box.x + fd.detection.box.width / 2, fd.detection.box.y);
      ctx.lineTo(fd.detection.box.x + fd.detection.box.width / 2, fd.detection.box.y + fd.detection.box.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(fd.detection.box.x, fd.detection.box.y + fd.detection.box.height / 2);
      ctx.lineTo(fd.detection.box.x + fd.detection.box.width, fd.detection.box.y + fd.detection.box.height / 2);
      ctx.stroke();
    });
  }


  private createCanvasContainer(x: number) : CanvasRenderingContext2D {
    const div = document.getElementById(this.canvasContainerResult);
    const nodeCanvas = document.createElement('canvas');
    const nombre = 'canvas' + x++;
    console.log('nombre ', nombre)
    nodeCanvas.setAttribute('id', nombre);
    nodeCanvas.setAttribute('style', 'outline: black 3px solid;margin: 5px');
    div.appendChild(nodeCanvas);

    const elemento1 = nodeCanvas as HTMLCanvasElement
    return elemento1.getContext('2d');
  }

  private DrawImageFromCanvasFace(fd: any, ctx: CanvasRenderingContext2D): void {

    console.log(fd.age, fd.gender);
    const age = fd.age;
    const gender = fd.gender;
    const nueva = new Image();
    const self = this;
    nueva.onload = (function (x: number, y: number, px: number, py: number) {
      return function () {
        ctx.canvas.width = px;
        ctx.canvas.height = py;
        ctx.drawImage(nueva, x, y, px, py, 0, 0, px, py);

        // creamos una imagen nueva desde un canvas
        const image = new Image();
        image.setAttribute('class', 'img-thumbnail');
        image.setAttribute('style', 'width: 150px;height: auto;');
        image.src = ctx.canvas.toDataURL();

        const divRowImg = document.createElement('div');
        divRowImg.setAttribute('class', 'row');

        const divColImg = document.createElement('div');
        divColImg.setAttribute('class', 'col col-lg-2');

        const divColDescImg = document.createElement('div');
        divColDescImg.setAttribute('class', 'col col-lg-6');
        
        const pAge = document.createElement('h2');
        pAge.innerHTML = age;

        const pGender = document.createElement('h2');
        pGender.innerHTML = gender;
        
        divColImg.appendChild(image);
       
        divColDescImg.appendChild(pGender);
        divColDescImg.appendChild(pAge);
        
        divRowImg.appendChild(divColImg);
        divRowImg.appendChild(divColDescImg);

        document.getElementById(self.imagenesContainerResult).appendChild(divRowImg);
      };
    })(fd.detection.box.x, fd.detection.box.y, fd.detection.box.width, fd.detection.box.height);
    nueva.src = this.imgData;
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

      let fullFaceDescriptions = await faceapi.detectAllFaces(input)
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions()
        .withAgeAndGender();

      console.log(fullFaceDescriptions);
      

      self.drawLineFace(fullFaceDescriptions, self.context);

      let x = 0;
      fullFaceDescriptions.forEach(fd => {
        const context1 = self.createCanvasContainer(x++);
        self.DrawImageFromCanvasFace(fd, context1);
      });

      // draw a textbox displaying the face expressions with minimum probability into the canvas
      const displaySize = { width: self.context.canvas.width, height: self.context.canvas.height }
      const resizedResults = faceapi.resizeResults(fullFaceDescriptions, displaySize);
      const minProbability = 0.05;
      faceapi.draw.drawFaceExpressions(mycanvas, resizedResults, minProbability);

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
