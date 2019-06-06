import { Component, OnInit } from '@angular/core';
import * as faceapi from 'face-api.js';
import { min } from 'rxjs/operators';
import { SelectorFlags } from '@angular/compiler/src/core';
import { FaceDetection } from 'face-api.js';
import { posix } from 'path';
import { TraductorPipe } from './traductor-pipe';

export interface DataImagenes {
  score: number;
  age: number;
  gender: string;
  genderProbability: number;
  width: number;
  height: number;
  posX: number;
  posY: number;
}


@Component({
  selector: 'app-upload-detect',
  templateUrl: './upload-detect.component.html',
  styleUrls: ['./upload-detect.component.css'],
  providers: [ TraductorPipe ]
})
export class UploadDetectComponent implements OnInit {

  private context: CanvasRenderingContext2D;
  private canvasInput: string;
  private imageInput: string;
  private imgData: string;

  private canvasContainerResult: string;
  private imagenesContainerResult: string;


  private MODEL_URL: string;
  private isLoading: boolean;
  private mostrarTabla: boolean;

  constructor(private traductorPipe: TraductorPipe) {
    this.MODEL_URL = '/assets/models';
    this.imageInput = 'image-input';
    this.canvasInput = 'canvas-input';
    this.canvasContainerResult = 'canvas-container-result';
    this.imagenesContainerResult = 'imagenes-container-result';
    this.isLoading = true;
    this.mostrarTabla = false;

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
      self.isLoading = false;
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
    this.mostrarTabla = true;
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


  private createCanvasContainer(x: number): CanvasRenderingContext2D {
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

/*
  private createNodeImage(ctx: CanvasRenderingContext2D, data: DataImagenes): HTMLElement {

    const image = new Image();
    image.src = ctx.canvas.toDataURL();

    image.setAttribute('class', 'img-thumbnail');
    image.setAttribute('style', 'width: 150px;height: auto;');

    const divRowImg = document.createElement('div');
    divRowImg.setAttribute('class', 'row');

    const divColImg = document.createElement('div');
    divColImg.setAttribute('class', 'col col-lg-2');

    const divColDescImg = document.createElement('div');
    divColDescImg.setAttribute('class', 'col col-lg-6');

    const pAge = document.createElement('h2');
    pAge.innerHTML = "Edad : " + data.age.toFixed(2);

    const pGender = document.createElement('h2');
    pGender.innerHTML = "Genero : " + data.gender;

    divColImg.appendChild(image);

    divColDescImg.appendChild(pGender);
    divColDescImg.appendChild(pAge);

    divRowImg.appendChild(divColImg);
    divRowImg.appendChild(divColDescImg);

    return divRowImg;

  }
*/

  private createNodeImage(ctx: CanvasRenderingContext2D, data: DataImagenes): HTMLElement {

    const image = new Image();
    image.src = ctx.canvas.toDataURL();

    image.setAttribute('class', 'img-thumbnail');
    image.setAttribute('style', 'width: 50px;height: auto;');

    const divRowImg = document.createElement('tr');
    divRowImg.setAttribute('class', 'middle');

    const td0 = document.createElement('td');
    td0.setAttribute('style', 'vertical-align: middle;')    
    const td1 = document.createElement('td');
    td1.setAttribute('style', 'vertical-align: middle;')
    const td2 = document.createElement('td');
    td2.setAttribute('style', 'vertical-align: middle;')
    const td3 = document.createElement('td');
    td3.setAttribute('style', 'vertical-align: middle;')
    const td4 = document.createElement('td');
    td4.setAttribute('style', 'vertical-align: middle;')

    
    td0.appendChild(image);
    td1.innerHTML = data.score.toFixed(2);
    td2.innerHTML = data.age.toFixed(2);
    td3.innerHTML = data.gender.toUpperCase();
    td4.innerHTML = data.genderProbability.toFixed(2);
    
    divRowImg.appendChild(td0);
    divRowImg.appendChild(td1);
    divRowImg.appendChild(td2);
    divRowImg.appendChild(td3);
    divRowImg.appendChild(td4);
    
    

    return divRowImg;

  }


  private DrawImageFromCanvasFace(fd: any, ctx: CanvasRenderingContext2D): void {

    console.log(fd.age, fd.gender);

    const dataImagenes: DataImagenes = {
      score: fd.detection.score,
      age: fd.age,      
      gender: this.traductorPipe.translate(fd.gender),
      genderProbability: fd.genderProbability,
      width: fd.detection.box.width,      
      height: fd.detection.box.height,
      posX: fd.detection.box.x,
      posY: fd.detection.box.y
    };

    console.log(dataImagenes);

    const nueva = new Image();
    const self = this;
    nueva.onload = (function () {
      return function () {
        ctx.canvas.width = dataImagenes.width;
        ctx.canvas.height = dataImagenes.height;
        ctx.drawImage(nueva, dataImagenes.posX, dataImagenes.posY,
          dataImagenes.width, dataImagenes.height,
          0, 0,
          dataImagenes.width, dataImagenes.height);

        // creamos una imagen nueva desde un canvas
        const divRowImg = self.createNodeImage(ctx, dataImagenes);
        document.getElementById(self.imagenesContainerResult).appendChild(divRowImg);

      };
    })();
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

      let fullFaceDescriptions = await faceapi.detectAllFaces(input)
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions()
        .withAgeAndGender();

      console.log(fullFaceDescriptions);

      // draw a textbox displaying the face expressions with minimum probability into the canvas
      const displaySize = { width: self.context.canvas.width, height: self.context.canvas.height }
      const resizedResults = faceapi.resizeResults(fullFaceDescriptions, displaySize);
      const minProbability = 0.05;
      faceapi.draw.drawFaceExpressions(mycanvas, resizedResults, minProbability);
      faceapi.draw.drawDetections(mycanvas, fullFaceDescriptions);


      self.drawLineFace(fullFaceDescriptions, self.context);

      let x = 0;
      fullFaceDescriptions.forEach(fd => {
        const context1 = self.createCanvasContainer(x++);
        self.DrawImageFromCanvasFace(fd, context1);
      });

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
