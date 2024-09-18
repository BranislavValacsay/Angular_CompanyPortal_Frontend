import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor(private spinnerService: NgxSpinnerService) { }

  busyRequestCount = 0;

  busy(){
    this.busyRequestCount++;
    this.spinnerService.show()
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <=-0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
