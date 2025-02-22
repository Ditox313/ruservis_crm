import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { getRoutes } from './routes/account.route';
import { LayoutsModule } from '../shared/modules/layouts/layouts.module';
import { AuthService } from './services/auth.service';
import { AccountSettingPageComponent } from './components/account-setting-page/account-setting-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { LoaderModule } from '../shared/modules/loader/loader.module';
import { Actions, EffectsModule } from '@ngrx/effects';
import { AccountEffect } from './store/effects/account.effect';



@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AccountSettingPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forChild(getRoutes()),
    LayoutsModule,
    LoaderModule,
    StoreModule.forFeature('account', reducers),
    EffectsModule.forFeature([AccountEffect]),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    AuthService,
    Actions
  ],
})
export class AccountModule { }
