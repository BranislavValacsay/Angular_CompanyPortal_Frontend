import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { jobtechstackcategory } from '../models/job-techstack-category';

@Injectable({
  providedIn: 'root'
})
export class JobTechstackCategoryService {

  constructor(private http: HttpClient) { }
  
  baseUrl:string = environment.baseurl+"ENUM_JobTechstackCategory";
  
  //this is for ENUMERATION
  dataFromDb(){

    return this.http.get<jobtechstackcategory>(this.baseUrl).pipe(map((response:any)=>
        {
          const jobtypeList = response;
          if(jobtypeList){
          return jobtypeList;
          }
        }
      )
    )
  }
}
