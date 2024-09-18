import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ENUM_jobTechstack } from '../models/job-techstack';
import { ENUM_jobType } from '../models/ENUM_jobType';

@Injectable({
  providedIn: 'root'
})
export class JobTechstackService {

  constructor(private http: HttpClient) {
    
   }

  baseUrl:string = environment.baseurl+"enum_jobtechstack";
  AddRemoveTechStackUrl:string = environment.baseurl+"AUTH_Post_TechStack"

  //this is for ENUMERATION
  dataFromDb(){

    return this.http.get<ENUM_jobTechstack>(this.baseUrl).pipe(map((response:any)=>
        {
          const ENUM_jobTypeList = response;
          if( ENUM_jobTypeList ){
          return ENUM_jobTypeList;
          }
        }
      )
    )
  }
  

  dataToDb(jobType:any){
    return this.http.post<ENUM_jobTechstack>(this.baseUrl,jobType).pipe(map(result => {
      return result;
      })
    );
  }

  insertTechStackDataToDb(techstack:any){
    return this.http.post<ENUM_jobTechstack>(this.AddRemoveTechStackUrl,techstack).subscribe();
  }

  deleteTechStackDataFromDb(techstack:any){
    this.http.request('delete',this.AddRemoveTechStackUrl, {body:techstack}).subscribe();
    //this.http.delete<ENUM_jobTechstack>(this.AddRemoveTechStackUrl,techstack).subscribe();
  }
}