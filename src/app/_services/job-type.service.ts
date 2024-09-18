import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ENUM_jobType } from '../models/ENUM_jobType';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(private http: HttpClient) { }

  baseUrl:string = environment.baseurl+"enum_jobtype";


  dataFromDb(){

    return this.http.get<ENUM_jobType>(this.baseUrl).pipe(map((response:any)=>
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
    return this.http.post<ENUM_jobType>(this.baseUrl,jobType).subscribe()
  }
}
