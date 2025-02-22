import { Component } from '@angular/core';
import { AfterViewInit, ChangeDetectorRef, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
// import { isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form!: FormGroup;
  formLoginSub$!: Subscription
  paramsSub$!: Subscription
  params!: any
  // isLoadingSelector$!: Observable<boolean | null>


  constructor(
    private route: ActivatedRoute
    ) {}


    ngOnInit(): void {
      this.initionalForm()
      // this.initValues()
    }
  
    // initValues() {
    //   this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
    // }

  
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
            // this.messageService.add({ severity: 'success', summary: 'Теперь вы можете зайти в систему используя свои данные', detail: 'Поздравляем!' });
            alert('Теперь вы можете зайти в систему используя свои данные')
          } else if (params['accessDenied']) {
            // this.messageService.add({ severity: 'error', summary: 'Сначала авторизируйтесь в системе', detail: 'Введите свои данные' });
            alert('Сначала авторизируйтесь в системе')
          } else if (params['sessionFailed']) {
            alert('Пожалуйста войдите в систему заново')
            // this.messageService.add({ severity: 'error', summary: 'Пожалуйста войдите в систему заново', detail: 'Попробуйте еще раз' });
          }
        }
      });

    }
  
  
    // Отправка формы
    onSubmit()
    {
      // const user: UserRequestLogin = {
      //   email: this.form.value.email,
      //   password: this.form.value.password,
      // };

       const user = {
        email: this.form.value.email,
        password: this.form.value.password,
      };

      console.log(user);
    }
}
