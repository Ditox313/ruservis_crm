import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { TokenInterceptor } from './shared/other/token.interceptor';
// import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { EffectsModule } from '@ngrx/effects';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    AccountModule,
    // StoreModule.forRoot({}, {}),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // EffectsModule.forRoot([]),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi(),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   multi: true,
    //   useClass: TokenInterceptor,
    // },
  )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
