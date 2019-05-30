import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { Componente2Component } from './componente2/componente2.component';
import { Componente1Component } from './componente1/componente1.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { FacedetectionComponent } from './facedetection/facedetection.component';

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
    component: UploadfileComponent
  },  {
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
