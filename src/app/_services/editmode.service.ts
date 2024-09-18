import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { editMode } from '../models/editMode';
import { searchParams } from '../models/searchParams';

@Injectable({
  providedIn: 'root'
})
export class EditmodeService {

  
  private currentEditMode = new ReplaySubject<editMode>(1);
  currentMode$ = this.currentEditMode.asObservable();

  constructor() { }

  setEditMode(mode:editMode){
    localStorage.setItem('editmode',JSON.stringify(mode));
    this.currentEditMode.next(mode);
  }
}
