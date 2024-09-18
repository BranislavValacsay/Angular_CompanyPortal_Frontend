import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/accountService';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (private accountService: AccountService, private _snackBar: MatSnackBar) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user.roles.includes("Admin")) {
          return true;
        }
        this.openSnackBar("ERROR: You cannon enter this area",null);
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