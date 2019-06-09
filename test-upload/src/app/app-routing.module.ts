import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { Componente2Component } from './componente2/componente2.component';
import { Componente1Component } from './componente1/componente1.component';
import { FacedetectionComponent } from './facedetection/facedetection.component';
import { UploadDetectComponent } from './upload-detect/upload-detect.component';
import { UploadAngieComponent } from './upload-angie/upload-angie.component';
import { UploadAngiePdfComponent } from './upload-angie-pdf/upload-angie-pdf.component';

const routes: Routes = [
  {
    path: 'componente1',
    component: Componente1Component
  },
  {
    path: 'componente2',
    component: Componente2Component
  }, {
    path: 'welcome',
    component: WelcomeComponent
  }, {
    path: 'upload',
    component: UploadDetectComponent
  }, {
    path: 'upload-angie',
    component: UploadAngieComponent,
  }, {
    path: 'upload-angie-pdf',
    component: UploadAngiePdfComponent,
  }, {
    path: 'facedetection',
    component: FacedetectionComponent,
  }, {
    path: '**',
    component: WelcomeComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
