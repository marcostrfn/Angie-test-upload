import { Component, OnInit } from '@angular/core';
import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';
import { parseIntAutoRadix } from '@angular/common/src/i18n/format_number';
import { bloomHasToken } from '@angular/core/src/render3/di';

@Component({
  selector: 'app-facedetection',
  templateUrl: './facedetection.component.html',
  styleUrls: ['./facedetection.component.css']
})
export class FacedetectionComponent implements OnInit {

  private context: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;

  imgscr = 'assets/imagen2.jpg';
  myImg = new Image();
  mostrarBoton : boolean;

  constructor() {
    this.mostrarBoton = false;
  }

  ngOnInit() {

    let elemento = document.getElementById("stage") as HTMLCanvasElement
    this.context = elemento.getContext('2d');
    this.canvasWidth = elemento.width;
    this.canvasHeight = elemento.height;
    this.addShadowEffect();

    let a = this.context;
    let m = this.myImg;
    let miBoton = this.mostrarBoton;

    this.myImg.onload = function () {
      a.canvas.width = m.width;
      a.canvas.height = m.height;
      a.drawImage(m, 0, 0);
    };
    this.myImg.src = this.imgscr;


    async function run(f: FacedetectionComponent) {
      const MODEL_URL = '/assets/models'

      console.log(miBoton);

      console.log('inicio carga de componentes');
      await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
      await faceapi.loadFaceLandmarkModel(MODEL_URL);
      await faceapi.loadFaceRecognitionModel(MODEL_URL);
      console.log('fin carga de componentes');
      f.mostrarBoton = true;
    };

    run(this);


  }

  private rellenar() {


    console.log('inicio rellenar');

    let ctx = this.context;

    async function run() {

      const input = "im";
      const mycanvas = "stage";
      let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
      console.log(fullFaceDescriptions);


      fullFaceDescriptions.forEach(fd => {
        //ctx.beginPath();
        //ctx.rect(fd.detection.box.x, fd.detection.box.y, fd.detection.box.width, fd.detection.box.height);
        //ctx.fillStyle = "red";
        //ctx.fill();
        ctx.beginPath();
        ctx.moveTo(fd.detection.box.x, fd.detection.box.y);
        ctx.lineTo(fd.detection.box.width+fd.detection.box.x, fd.detection.box.height+fd.detection.box.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(fd.detection.box.x+fd.detection.box.width/2, fd.detection.box.y);
        ctx.lineTo(fd.detection.box.x+fd.detection.box.width/2, fd.detection.box.y+fd.detection.box.height );
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(fd.detection.box.x, fd.detection.box.y+fd.detection.box.height/2);
        ctx.lineTo(fd.detection.box.x+fd.detection.box.width, fd.detection.box.y+fd.detection.box.height/2 );
        ctx.stroke();


      });

      faceapi.draw.drawDetections(mycanvas, fullFaceDescriptions);
      console.log("final");
    }

    run();

  }


  private accion() {
    console.log(this.mostrarBoton);
  }


  private addShadowEffect() {
    this.context.shadowBlur = 5;
    this.context.shadowOffsetX = 2;
    this.context.shadowOffsetY = 2;
    this.context.shadowColor = '#333';
    this.context.globalAlpha = 0.8;
  }


}
