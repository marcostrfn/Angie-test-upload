import { BrowserModule, SafeUrl } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Componente1Component } from './componente1/componente1.component';
import { Componente2Component } from './componente2/componente2.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IconsModule } from './icons/icons.module';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { NavbarSupComponent } from './navbar-sup/navbar-sup.component';
import { NavbarInfComponent } from './navbar-inf/navbar-inf.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { MySafeUrl } from './mysafeurl.pipe';
import { FacedetectionComponent } from './facedetection/facedetection.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Componente1Component,
    Componente2Component,
    WelcomeComponent,
    JumbotronComponent,
    NavbarSupComponent,
    NavbarInfComponent,
    UploadfileComponent,
    FacedetectionComponent,
    MySafeUrl
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }