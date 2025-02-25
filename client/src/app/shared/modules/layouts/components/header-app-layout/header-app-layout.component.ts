import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { UserResponceRegister } from '../../../../../account/types/account.interfaces';
import { currentUserSelector } from '../../../../../account/store/selectors';
import { select, Store } from '@ngrx/store';
import { logoutAction } from '../../../../../account/store/actions/account.action';


@Component({
  selector: 'app-header-app-layout',
  templateUrl: './header-app-layout.component.html',
  styleUrls: ['./header-app-layout.component.css'],
  standalone: false, 
})
export class HeaderAppLayoutComponent implements OnInit {
  @Input() title: string = '';
  @Input() number?: any = '';
  currentUserSelector$!: Observable<UserResponceRegister | null | undefined>
  currentUser!: UserResponceRegister | null | undefined
  isVisibleAccountInfo: boolean = false



  
  constructor(
    private store: Store, 
    private location: Location
  ) { }
  
  ngOnInit(): void {
    this.initValues()
  }



  initValues() {
    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    this.currentUserSelector$.subscribe({
      next: (user)=>{
        this.currentUser = user
      }
    })
  }


  setVisibleAccountInfo()
  {
    this.isVisibleAccountInfo = !this.isVisibleAccountInfo
  }

  logout(): void {
    this.store.dispatch(logoutAction())
  }

  isGoBack() {
    this.location.back();
  }
}
