import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRequestRegister } from '../../types/account.interfaces';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { registerAction } from '../../store/actions/account.action';
import { Store, select } from '@ngrx/store';
import { isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup;
  formRegisterSub$!: Subscription
  isLoadingSelector$!: Observable<boolean | null>

  constructor(
      private store: Store
  ) { }



  ngOnInit() {
    this.initForm()
    this.initValues()
  }
  



  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
    });
  }


  initValues()
  {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }


  

  onSubmit() {
    this.form.disable();

    const user: UserRequestRegister = {
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      name: this.form.value.name,
      secondName: this.form.value.secondName,
      lastName: this.form.value.lastName,
    };

    // this.auth.register(user).subscribe(()=>{
    //   console.log('Успешно!');
    // },)

    this.store.dispatch(registerAction({ user }))

    this.form.enable();
  }

}
