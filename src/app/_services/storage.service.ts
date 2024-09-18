import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { editMode } from '../models/editMode';
import { searchParams } from '../models/searchParams';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentParamSource = new ReplaySubject<searchParams>(1);
  currentParam$ = this.currentParamSource.asObservable();

  constructor() { }

  setSearchParams(params:searchParams){

    localStorage.setItem('search',JSON.stringify(params));//localstorage
    this.currentParamSource.next(params);
  }


}
