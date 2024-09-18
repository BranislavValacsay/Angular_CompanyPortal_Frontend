import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/accountService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private accountService: AccountService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { }


  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.openSnackBar("ERROR: You cannon enter this area",null);
        this.router.navigateByUrl('/')
        return false;
      })
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000,
      panelClass: ['dark-snackbar','d-flex','justify-content-center','fva','l']
    });
  }
}
