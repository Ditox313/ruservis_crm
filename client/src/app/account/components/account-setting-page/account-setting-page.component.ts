import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserResponceRegister } from '../../types/account.interfaces';
import { Store, select } from '@ngrx/store';
import { currentUserSelector, isLoadingSelector } from '../../store/selectors';
import { updateUserAction } from '../../store/actions/account.action';



@Component({
  selector: 'app-account-setting-page',
  standalone: false,
  templateUrl: './account-setting-page.component.html',
  styleUrl: './account-setting-page.component.css'
})
export class AccountSettingPageComponent {
  title: string = 'Настройки аккаунта'
  form!: FormGroup; 
  isLoadingSelector$!: Observable<boolean | null>
  currentUserSelector!: Observable<UserResponceRegister | null | undefined>
  currentUserSub$!: Subscription
  currentUser!: UserResponceRegister | null | undefined
  uploadFile!: File
  avatar: string | ArrayBuffer | undefined | null = '' ;
  @ViewChild('upload') upload!: ElementRef;



  constructor(private store: Store) { }


  ngOnInit(): void {
    this.initionalForm();
    this.initValues()
  }

  ngOnDestroy(): void {
    if (this.currentUserSub$) {
      this.currentUserSub$.unsubscribe();
    }
  }

  initionalForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      doverenostNumber: new FormControl(null),
      doverenostDate: new FormControl(null),
    });
  }

  initValues() {
    this.currentUserSelector = this.store.pipe(select(currentUserSelector))
    this.currentUserSub$ = this.currentUserSelector.subscribe({
      next: (user) => {
        this.currentUser = user
        
        if(user)
        {
          this.pathValueUser(user)
        }
      }
    })
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }



  // Обрабатываем загрузку картинок
  onFileUploadAvatar(event: any) {
    const file = event.target.files['0'];
    this.uploadFile = file;
    // Подключаем ридер для считывания картинки
    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      // Переменная для хранения информации об изображении
      this.avatar = reader.result;
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }



  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClickForUploadAvatar() {
    this.upload.nativeElement.click();
  }

  pathValueUser(user: UserResponceRegister)
  {
    this.form.patchValue({
      email: user.email,
      phone: user.phone,
      name: user.name,
      secondName: user.secondName,
      lastName: user.lastName,
    });

    this.avatar = user.avatar
  }




  onSubmitProfile()
  {
    const user: UserResponceRegister = {
      email: this.form.value.email,
      phone: this.form.value.phone,
      password: this.form.value.password,
      name: this.form.value.name,
      secondName: this.form.value.secondName,
      lastName: this.form.value.lastName,
    };

    this.store.dispatch(updateUserAction({ user, avatar: this.uploadFile }))
  }
}
