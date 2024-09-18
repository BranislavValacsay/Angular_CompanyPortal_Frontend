import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { jobDTO } from '../DTO/jobDTO';
import { jobOfferDTO } from '../DTO/jobOfferDTO';

@Injectable({
  providedIn: 'root'
})
export class CommServiceService {
  

  url:string = environment.baseurl +"p_JobOfferList";
  jobs:jobDTO;
  jobOffer:jobOfferDTO;

  constructor(private http: HttpClient) { }

  listJobs(parameters:HttpParams) {
      return this.http.get<jobDTO>(this.url+"?"+parameters).pipe(
        map(response=>{
          this.jobs=response;
          return response;
        })
      )

  }

  loadJob(guid:string) {
    return this.http.get<any>(environment.baseurl + "p_JobOfferList/"+guid).pipe(
      map((response:any) => {
        return response;
      })
    )
  }

}
