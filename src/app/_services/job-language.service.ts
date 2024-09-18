import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ENUM_jobLanguage } from '../models/ENUM_jobLanguage';

@Injectable({
  providedIn: 'root'
})
export class JobLanguageService {

  constructor(private http: HttpClient) { }

  baseUrl:string = environment.baseurl+"enum_jobLanguage";


  dataFromDb(){

    return this.http.get<ENUM_jobLanguage>(this.baseUrl).pipe(map((response:any)=>
        {
          const jobtypeList = response;
          if(jobtypeList){
          return jobtypeList;
          }
        }
      )
    )
  }

  dataToDb(jobType:any){
    return this.http.post<ENUM_jobLanguage>(this.baseUrl,jobType).subscribe()
  }
}
