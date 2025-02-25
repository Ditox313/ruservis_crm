import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderAppLayoutComponent } from './components/header-app-layout/header-app-layout.component';
import { AuthService } from '../../../account/services/auth.service';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { LoaderModule } from '../loader/loader.module';




@NgModule({
  declarations: [
    AuthLayoutComponent,
    AppLayoutComponent,
    HeaderAppLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoaderModule,
  ],
  providers: [ AuthService],
  exports: [
    AuthLayoutComponent,
    AppLayoutComponent,
    HeaderAppLayoutComponent
  ]
})
export class LayoutsModule { }
