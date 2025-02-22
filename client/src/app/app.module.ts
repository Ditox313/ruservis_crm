import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './shared/other/token.interceptor';

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
    // Настройка HTTP-клиента
    provideHttpClient(withInterceptorsFromDi()),

    // Настройка интерцептора
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }