import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from './layouts/layouts.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor } from './core/interceptors';

import { ToastService, AngularToastifyModule } from 'angular-toastify'; 
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LayoutsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularToastifyModule,
    ConfirmDialogModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:HeaderInterceptor,multi:true
    },
    ToastService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
