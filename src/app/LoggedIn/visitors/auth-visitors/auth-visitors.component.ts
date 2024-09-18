import { Component, OnInit } from '@angular/core';
import { visitorsDTO } from 'src/app/DTO/visitorsDTO';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-visitors',
  templateUrl: './auth-visitors.component.html',
  styleUrls: ['./auth-visitors.component.css']
})
export class AuthVisitorsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  visitors:visitorsDTO;
  url:string = environment.baseurl +"visitors";
  displayedColumns: string[] = ['id','jobOfferId','visitorIp','jobUrl','visitDate','visitTime'];

  ngOnInit(): void {
    this.loadVisitors();
  }

  loadVisitors(){
    this.http.get<visitorsDTO>(this.url).subscribe(
      response=>{
        this.visitors=response;
    });
  }
  
}