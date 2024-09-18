import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl:string = environment.baseurl+"account/login";
  
  private currentUserSource = new ReplaySubject<user>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }
    
  userLogin(login:any){

    return this.http.post<user>(this.baseUrl,login).pipe(map((response:user)=>
        {
          const user = response;
          if(user){
            this.setCurrentUser(user);
          }
        }
      )
    )
  }

  setCurrentUser(user:user)
  {
    if (user !== null ) {
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;
      Array.isArray(roles)? user.roles = roles : user.roles.push(roles);
      localStorage.setItem('user',JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }

  
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }

  getDecodedToken(token:any) {
    return JSON.parse(atob(token.split('.')[1]))
  }

}