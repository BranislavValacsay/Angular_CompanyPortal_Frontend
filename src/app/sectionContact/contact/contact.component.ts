import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {



  constructor(private http: HttpClient,private router: Router,private _snackBar: MatSnackBar) { }

  url:string=environment.baseurl+"p_contact/"
  devEnv = !environment.production;
  formContactUs:Form;
  messageSent:boolean = false;


  ngOnInit(): void {

  }

  sendMessage(message:NgForm){
    let form = message.value;
    if(form.name == "" || form.email == "" || form.phone == "" || form.subject == "" || form.messageText == "")
    {
      this.openSnackBar('Prosím, vyplňte všetky políčka',null)
    }
    else {
      let form = message.value;
      this.http.post(this.url,form).subscribe(response=>{
      form=response
      this.messageSent = true;
      },error => {console.log(error)})
    }    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000,
      panelClass: ['dark-snackbar','d-flex','justify-content-center','fva','l']
    });
  }
}
