import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ENUM_jobState } from '../models/ENUM_jobState';

@Injectable({
  providedIn: 'root'
})
export class JobStateService {

  constructor(private http: HttpClient) { }

  baseUrl:string = environment.baseurl+"enum_jobstate";


  dataFromDb(){

    return this.http.get<ENUM_jobState>(this.baseUrl).pipe(map((response:any)=>
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
    return this.http.post<ENUM_jobState>(this.baseUrl,jobType).subscribe()
  }
}
