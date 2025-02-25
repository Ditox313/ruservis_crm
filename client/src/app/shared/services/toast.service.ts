import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    const toast = this.renderer.createElement('div');
    this.renderer.addClass(toast, 'toast');
    this.renderer.addClass(toast, `toast-${type}`);

    const messageElement = this.renderer.createElement('div');
    this.renderer.addClass(messageElement, 'toast-message');
    const text = this.renderer.createText(message);
    this.renderer.appendChild(messageElement, text);
    this.renderer.appendChild(toast, messageElement);

    this.renderer.appendChild(document.body, toast);

    setTimeout(() => {
      this.renderer.removeChild(document.body, toast);
    }, duration);
  }
}