import { Component, ViewChild } from '@angular/core';
import {Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserRequestLogin } from '../../types/account.interfaces';
import { loginAction } from '../../store/actions/account.action';
import { select, Store } from '@ngrx/store';
import { isLoadingSelector } from '../../store/selectors';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formLoginSub$!: Subscription
  paramsSub$!: Subscription
  params!: any
  isLoadingSelector$!: Observable<boolean | null>

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private toast: ToastService
    ) {}


    ngOnInit(): void {
      this.initionalForm()
      this.initValues()
    }
  
    initValues() {
      this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
    }

  
    ngAfterViewInit(): void {
      this.getParams()
    }
  
    ngOnDestroy() {
      if (this.formLoginSub$) {
        this.formLoginSub$.unsubscribe();
      }
      if (this.paramsSub$) {
        this.paramsSub$.unsubscribe();
      }
    }
  
   
  
    // Инициализация формы
    initionalForm() {
      this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    }



  
    // Получаем параметры
    getParams() {
      this.paramsSub$ = this.route.queryParams.subscribe({
        next: (params: Params) => {
          if (params['registered']) {
            this.toast.show('Теперь вы можете зайти в систему используя свои данные!', 'success');
          } else if (params['accessDenied']) {
            this.toast.show('Сначала авторизируйтесь в системе!', 'error');
          } else if (params['sessionFailed']) {
            this.toast.show('Пожалуйста войдите в систему заново!', 'info');
          }
        }
      });

    }
  
  
    // Отправка формы
    onSubmit()
    {
      const user: UserRequestLogin = {
        email: this.form.value.email,
        password: this.form.value.password,
      };


      try {
        this.store.dispatch(loginAction({ user }))
      } catch (error) {
      }
    }
}
