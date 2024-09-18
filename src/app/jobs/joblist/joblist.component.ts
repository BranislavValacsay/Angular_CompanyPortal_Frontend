import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { jobDTO } from 'src/app/DTO/jobDTO';
import { environment } from 'src/environments/environment';
import { searchParams } from 'src/app/models/searchParams';
import { StorageService } from 'src/app/_services/storage.service';
import { ENUM_jobType } from 'src/app/models/ENUM_jobType';
import { JobTypeService } from 'src/app/_services/job-type.service';
import { take } from 'rxjs/operators';
import { MatChip, MatChipList } from '@angular/material/chips';
import { ENUM_jobTechstack } from 'src/app/models/job-techstack';
import { JobTechstackService } from 'src/app/_services/job-techstack.service';
import { CommServiceService } from 'src/app/_services/comm-service.service';


@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css'],
})

export class JoblistComponent implements OnInit {

  constructor(
      private http: HttpClient,
      private router: Router,
      private jobTypeService: JobTypeService,
      private StorageService:StorageService,
      private jobTechStackService: JobTechstackService,
      private commservice: CommServiceService
      )

    {
    //put job type to cache so I can create list of chips right away
    this.jobTypeService.dataFromDb().subscribe(response => {
      this.jobType = response;
    })

    //search parameters saved from form to local session storage
    this.StorageService.currentParam$.pipe(take(1)).subscribe(params => {
      this.params=params;
    });

    //job techstack
    this.jobTechStackService.dataFromDb().subscribe(response => {
      this.jobTechStack = response;
    });
  }

  jobType:ENUM_jobType;
  job:jobDTO;
  jobTechStack:ENUM_jobTechstack;

  ulhidden:boolean=false;
  url:string = environment.baseurl +"p_JobOfferList";

  params: searchParams;
  invoice:number;
  selected?: string; //selected chip


  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(event.key === 'Enter')
    {
      this.listJobs();
    }

  }

  ngOnInit(): void{
    
    this.listJobs();
  }

  setSkillParam(skill:string){
    this.params.techstack = skill;
    this.listJobs();
  }

  chipSelect(input:any){
    if ((this.params.jobtype===undefined)||(this.params.jobtype.length === 0)) return false;
    if(this.params.jobtype.includes(input)) return true;
    return false;
  }

  checkIfNameIsEmpty(name:string)
  {
    if(name.length > 0)
    {
      this.listJobs();
    }
  }

  listJobs() {

    let parameters = new HttpParams();

    try {parameters = parameters.append('language',this.params.language.toString()); } catch{};
    try {parameters = parameters.append('techstack',this.params.techstack.toString());} catch{};
    try {parameters = parameters.append('title',this.params.title.toString());} catch{};
    try {parameters = parameters.append('jobtype',this.params.jobtype.toString());} catch{};

    this.StorageService.setSearchParams(this.params);
    
    this.commservice.listJobs(parameters).subscribe(
      (response:any) => {
        this.job = response;
      }
    )
  }


  calcInvoiceReward(employeeSalary:number){
    employeeSalary = Math.round(((((employeeSalary*1.352)/12)*13)/160)*168)
    employeeSalary = Math.round(employeeSalary/100);

    return employeeSalary*100;
  }

  calcUpperInvoiceReward(InvoiceReward:number){
    InvoiceReward = InvoiceReward+InvoiceReward*0.2;
    InvoiceReward = Math.round(InvoiceReward/100);
    return InvoiceReward * 100;
  }

  calcPureSalary(employeeSalary:number){

    var danZaklad = employeeSalary-(employeeSalary*0.134);
    var dan19 = danZaklad*0.19;
    var pureSalary = danZaklad - dan19;
    return Math.round(
      pureSalary
    )
  }


  resetFilter(chipList:MatChipList){

    this.params.title="";
    this.params.techstack="";
    this.params.language="";
    this.params.jobtype = "";

    chipList.chips.forEach((chip) => chip.deselect());
    this.listJobs();
  }

  click(row:any){
    this.router.navigateByUrl('/detail/'+row.jobUrl)
  }

  selectLanguage(lang:string){
    this.params.language=lang;
    this.listJobs();
  }

  toggleSelection(chip: MatChip, chipList:MatChipList) {

    chip.selected = !chip.selected;
    this.params.jobtype = "";
    chipList.chips.forEach((chip) => {
      if(chip.selected === true) {
        this.params.jobtype = this.params.jobtype.concat(chip.value+",");
      }
    })
    this.listJobs();
  }
}
