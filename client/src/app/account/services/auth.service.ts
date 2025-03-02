import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of, tap } from 'rxjs';
import { UserRequestLogin, UserRequestRegister, UserResponceLogin, UserResponceRegister } from '../types/account.interfaces';
import { ToastService } from '../../shared/services/toast.service';

// Обрати внимание в proxy.conf.json никаких звездочек типа /api/* быть не должно. иначае будет ошибка cannot post!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})





export class AuthService {
  private token:string = ''; 

  constructor(private http: HttpClient,  private toast: ToastService) {}

  
  // Регистрация пользователя
  register(user: UserRequestRegister): Observable<UserRequestRegister> {
    return this.http.post<UserResponceRegister>('/api/account/auth/register', user);
  }



  // Авторизация пользователя
  login(user: UserRequestLogin): Observable<UserResponceLogin> {
    return this.http.post<UserResponceLogin>('/api/account/auth/login', user).pipe(
      tap({
        next: ({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        },
        error: (err) => {
          this.toast.show(`${err.error.message}!, Попробуйте еще раз!`, 'error');
        },
      })
    );
  }


  // Изменят приватную переменную token
  setToken(token: string) {
    this.token = token;
  }

  // Что бы получать токен в других классах и использовать его(Что бы добовлять его к различным запросам)
  getToken(): string {
    return this.token;
  }

  // Определяем находится ли пользователь в сессии(Есть токен или нет)
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Выход из системы
  logout(): Observable<Boolean> {
    this.setToken('');
    localStorage.clear();
    return of(true)
  }

  // Обновить User
  updateUser(user: UserResponceRegister, avatar?: File ): Observable<UserResponceRegister> {
    const fd = new FormData();
    fd.append('email', user.email);
    fd.append('phone', user.phone);
    fd.append('name', user.name);
    fd.append('secondName', user.secondName);
    fd.append('lastName', user.lastName);
    

    if (user.password) {
      fd.append('password', user.password);
    }
    else
    {
      fd.append('password', '');
    }

    if (avatar) {
      fd.append('avatar', avatar, avatar.name);
    }

    return this.http.patch<UserResponceRegister>('/api/account/auth/updateUser/', fd);
  }


}