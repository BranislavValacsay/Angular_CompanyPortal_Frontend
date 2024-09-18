import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ENUM_jobCity } from '../models/ENUM_jobCity';

@Injectable({
  providedIn: 'root'
})
export class JobCityService {

  constructor(private http: HttpClient) { }

  baseUrl:string = environment.baseurl+"enum_jobcity";


  dataFromDb(){

    return this.http.get<ENUM_jobCity>(this.baseUrl).pipe(
      map((response:any)=>{
          const jobtypeList = response;
          if(jobtypeList){
          return jobtypeList;
          }
        }
      )
    )
  }

  dataToDb(jobType:any){
    return this.http.post<ENUM_jobCity>(this.baseUrl,jobType).subscribe()
  }
}
