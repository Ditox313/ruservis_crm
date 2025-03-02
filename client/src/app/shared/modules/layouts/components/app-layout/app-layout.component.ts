import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';``
import { updateStateAction } from '../../../../../account/store/actions/account.action';
import { isLoadingSelector, tokenSelector } from '../../../../../account/store/selectors';


@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
  standalone: false, 
})
export class AppLayoutComponent implements OnInit {
  isLoadingSelector$!: Observable<boolean | null>
  isTokenStateSub$!: Observable<string | null>

  links: any = [
    {
      url: '/test',
      name: 'Консоль',
      icon: 'fa fa-line-chart'
    },
    {
      url: '/test2',
      name: 'Персонал',
      icon: 'fa fa-users'
    },

    {
      url: '/account-settings-page',
      name: 'Аккаунт',
      icon: 'fa fa-user'
    },
  ];

  isSidebarOpen = true; // Состояние для открытия/закрытия сайдбара

  constructor( 
    private store: Store
  ) { }
  
  ngOnInit(): void {
    this.initValues()

    window.matchMedia('(max-width: 576px)').addEventListener('change', (event) => {
      this.isSidebarOpen = !this.isSidebarOpen;
    });
  }


  // Обновляем состояние в LocalStorage
  updateState()
  {
    this.store.subscribe(state => {
      localStorage.setItem('appState', JSON.stringify(state))
    })
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Переключаем состояние
  }


  initValues() {
    
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
    this.isTokenStateSub$ = this.store.pipe(select(tokenSelector))
    

    // Когда мы сделаем перезагрузку у нас слетит токнен. Соответственно пока мы не выполним dispatch по обновлении User, у нас токена не будет в state
    // И мы можем обновлять все другие состояния.А dispatch по обновлении User стоит выполнить в последнюю очередь. В редьюсере выбираем какие поля из 
    // состояния нужно обновлять при перезагрузки страницы.
    this.isTokenStateSub$.subscribe({
      next : (token) => {
        // Подписываемся на токнен.Пока его не будет мы будем просто базово обновлять состояние.
       if(token !== '')
       {
         this.updateState()
       }
       else
       {
        // Обновляем состояние смены
        //  this.store.dispatch(updateStateSmenaAction())

        //  Выполнять последним, что бы обновить токен только после всех обновлений состояний
         this.store.dispatch(updateStateAction())
       }
      }
    })
  }

  
}
