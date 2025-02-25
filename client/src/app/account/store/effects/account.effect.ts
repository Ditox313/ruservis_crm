import {inject, Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'
import {
  loginAction,
  loginSuccessAction,
  loginFailureAction,
  logoutAction,
  logoutSuccessAction,
  logoutFailureAction,
  registerAction,
  registerSuccessAction,
  registerFailureAction,
  updateStateAction,
  updateStateSuccessAction,
  updateStateFailureAction,
  updateUserAction,
  updateUserSuccessAction,
  updateUserFailureAction,
} from '../../store/actions/account.action';
import {AuthService} from '../../services/auth.service'
import {of} from 'rxjs'
import {Router} from '@angular/router'
import { UserResponceRegister } from '../../types/account.interfaces'
import { ToastService } from '../../../shared/services/toast.service';





@Injectable()
export class AccountEffect {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  // Инжектируем по новому
  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction), 
      switchMap(({ user }) => {
        return this.authService.login(user).pipe(
          map((data) => {
            return loginSuccessAction({data: data}); 
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.toast.show(`${errorResponse.error.message}!, Попробуйте еще раз`, 'error');
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterlogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigate(['/account-settings-page']);
          this.toast.show('Добро пожаловать!', 'success');
        })
      ),
    { dispatch: false }
  );


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      switchMap(() => {
        return this.authService.logout().pipe(
          map((data) => {
            localStorage.clear();
            this.router.navigate(['/login-page']);
            return logoutSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.toast.show('Ошибка выхода из системы!, Попробуйте еще раз', 'error');
            return of(
              logoutFailureAction({ errors: 'Ошибка выхода из системы' })
            );
          })
        );
      })
    )
  )


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ user }) => {
        return this.authService.register(user).pipe(
          map((currentUser: UserResponceRegister) => {
            this.router.navigate(['/login-page'], {
              queryParams: {
                registered: true,
              },
            });
            return registerSuccessAction();
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            this.toast.show(`${errorResponse.error.message}!, Попробуйте еще раз`, 'error');
            return of(
              registerFailureAction({ errors: errorResponse.error.message })
            );
          })
        );
      })
    )
  );


  updateState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStateAction),
        map(() => {
          const savedState: any = localStorage.getItem('appState');

          return updateStateSuccessAction({ data: JSON.parse(savedState) })
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(
            updateStateFailureAction({ errors: 'Ошибка обновления состояния' })
          );
        })
      ),
  );

  UpdateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserAction),
      switchMap(({ user, avatar }) => {
        return this.authService.updateUser(user, avatar).pipe(
          map((data) => {
            // this.messageService.add({ severity: 'success', summary: `Пользователь обновлен`, detail: 'Успешно!' });
            this.toast.show(`Пользователь обновлен успешно!`, 'success');
            return updateUserSuccessAction({ data: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            this.toast.show(`Ошибка обновления!, Попробуйте еще раз`, 'error');
            return of(
              updateUserFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );
}
