import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  scrollToFirstError(className = 'input-error', delay = 400): void {
    setTimeout(() => {
      const errorElement = document.querySelector(`.${className}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, delay);
  }
}
