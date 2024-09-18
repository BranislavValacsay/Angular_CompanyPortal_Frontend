import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { jobOfferDTO } from 'src/app/DTO/jobOfferDTO';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ipparam } from 'src/app/models/ipparam';

@Component({
  selector: 'app-jobdetail-print',
  templateUrl: './jobdetail-print.component.html',
  styleUrls: ['./jobdetail-print.component.css']
})
export class JobdetailPrintComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute,private modalService: BsModalService) {
    this.params = new ipparam();
  }

  job:jobOfferDTO;
  id:string;
  name:string="";
  url:string = environment.baseurl +"p_JobOfferList/";
  jobUrl:string = "https://www.netrunners.com/jobdetail/";
  applyUrl:string = environment.baseurl +"ApplyJob/";

  beenApplied:boolean=false;

  modalRef?: BsModalRef;
  upperSalary:number
  invoice:number;
  upperInvoice: number;

  editmode:boolean = false;
  editModeButton:boolean = false;
  modalError:boolean=false;
  ipaddress:any;
  params: ipparam;

  ngOnInit() {
    this.getIPAddress();
    this.editmode = !environment.production;
    this.editModeButton = !environment.production;
  }

  getJobDetails(IP:string) {

    let params = new HttpParams();
    try {params = params.append('IPAddress',IP); } catch{};

    this.id = this.route.snapshot.paramMap.get('url');
    this.http.get<jobOfferDTO>(this.url+this.id+"?"+params).subscribe(
      response=>{
        this.job=response;
        this.invoice=Math.round((((((this.job.salary*1.352)/12)*13)/160)*168)/100);
        this.invoice*=100
        this.upperInvoice = Math.round((this.invoice*1.2)/100)*100;
        this.upperSalary = Math.round((this.job.salary*1.2)/100)*100;
        this.jobUrl+=this.job.jobUrl;
      });

    }


  openModal(template: TemplateRef<any>) {
    this.modalError = false;
    this.modalRef = this.modalService.show(template);
    }


    sendMessage(message:NgForm){    
      let form = message.value;
      //this.modalRef?.hide()
      if(form.name === "" || form.email ==="" || form.phone ==="") {
      this.modalError=true;
      }
      else {
        this.http.post(this.applyUrl,form).subscribe(response=>{
        form=response,
        this.beenApplied = true;
        },error => {console.log(error)})
      }
    }

    getIPAddress()
    { 
      this.http.get(environment.baseurl+"getips").subscribe((res:any)=>{
        this.ipaddress = res.ipaddress;
        this.getJobDetails(this.ipaddress);
      });
    }
}
