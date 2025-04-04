import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }
  encode(val: any) {
    return new Promise(resolve => {
      const obj = {
        data: val
      }
      let response = encodeURIComponent(btoa(JSON.stringify(obj)));
      resolve(response);
    })
  }

  decode(val: any) {
    return new Promise(resolve => {
      const urlJson = atob(decodeURIComponent(val));
      const urlValue = JSON.parse(urlJson);
      resolve(urlValue.data);
    })
  }
}
