import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { AccountService} from 'src/app/_services/accountService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //user:user;

  constructor(
     private http: HttpClient,
     private accountService:AccountService,
     private router:Router,
     private _snackBar: MatSnackBar) {

  }

  baseUrl:string = environment.baseurl+"account/login";
  model:any = {};

  ngOnInit(): void {

  }

  userLogin(){
    this.accountService.userLogin(this.model).subscribe(response =>{
          this.router.navigateByUrl('/authjoblist');
      },error => {
        this.openSnackBar("Chyba - skontrolujte meno a heslo",null);
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000,
      panelClass: ['dark-snackbar','d-flex','justify-content-center','fva','l']
    });
  }

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://localhost:44377/api/test/gf/dl1');
    document.body.appendChild(link);
    link.click();
    link.remove();
}
}
