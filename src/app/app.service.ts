import { Injectable } from '@angular/core';
import { entUser } from './common/api-services/application-api/application-api.classes';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  user = new entUser()

  constructor() { }

  resultLeadForm: any ={};
}
