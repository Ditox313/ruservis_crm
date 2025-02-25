import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(private toastService: ToastService) {}

  showSuccessToast() {
    this.toastService.show('Это успешное сообщение!', 'success');
  }

  showErrorToast() {
    this.toastService.show('Это сообщение об ошибке!', 'error');
  }

  showInfoToast() {
    this.toastService.show('Это информационное сообщение!', 'info');
  }
}
