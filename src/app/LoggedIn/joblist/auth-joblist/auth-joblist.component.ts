import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { MatChip, MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AUTHjobDTO } from 'src/app/DTO/AUTHjobDTO';
import { ENUM_jobType } from 'src/app/models/ENUM_jobType';
import { searchParams } from 'src/app/models/searchParams';
import { JobTypeService } from 'src/app/_services/job-type.service';
import { StorageService } from 'src/app/_services/storage.service';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { jobOfferDTO } from 'src/app/DTO/jobOfferDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobTechstackService } from 'src/app/_services/job-techstack.service';
import { JobStateService } from 'src/app/_services/job-state.service';
import { JobCityService } from 'src/app/_services/job-city.service';
import { ENUM_jobCity } from 'src/app/models/ENUM_jobCity';
import { ENUM_jobState } from 'src/app/models/ENUM_jobState';
import { ENUM_jobTechstack } from 'src/app/models/job-techstack';

@Component({
  selector: 'app-auth-joblist',
  templateUrl: './auth-joblist.component.html',
  styleUrls: ['./auth-joblist.component.css']
})
export class AUTHJoblistComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private jobTypeService: JobTypeService,
    private StorageService:StorageService,
    private jobCityService: JobCityService,
    private jobStateService: JobStateService,
    private jobTechStackService: JobTechstackService,
    private modalService: BsModalService,
    private _snackBar: MatSnackBar
    ) {

    //job type      
    this.jobTypeService.dataFromDb().subscribe(response => {
      this.jobType = response;
    });
    //job city     
    this.jobCityService.dataFromDb().subscribe(response => {
      this.jobCity = response;
    });
    //job state      
    this.jobStateService.dataFromDb().subscribe(response => {
      this.jobState = response;
    });    
    //job techstack     
    this.jobTechStackService.dataFromDb().subscribe(response => {
      this.jobTechStack = response;      
    });
    //job parameters
    this.StorageService.currentParam$.pipe(take(1)).subscribe(params => {
      this.params=params;
    });
  }

  jobType: ENUM_jobType; //used for enumeration of job type field from backend to chips
  jobCity: ENUM_jobCity;
  jobState:ENUM_jobState;
  jobTechStack:ENUM_jobTechstack;

  jobTypeHelperVar : string = "";
  jobCityHelperVar : string = "";
  jobStateHelperVar : string = "";

  cloudUrl:string;
  
  selected="english";
  url:string = environment.baseurl +"Auth_job";
  job:AUTHjobDTO;
  params: searchParams;
  invoice:number;
  displayedColumns: string[] = ['Project', 'JobType','PrimarySkill', 'SecondarySkill', 'Language', 'Link','SourceID'];
  toggleClosedJobsOnly: boolean = false;
  modalRef?: BsModalRef;
  

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) { 
    if(event.key === 'Enter')
    {
      this.listJobs();
    }
  }

  ngOnInit(): void {

    this.listJobs();
  }

  

  chipSelect(input:any){
    if ((this.params.jobtype===undefined)||(this.params.jobtype.length === 0)) return false;
    if(this.params.jobtype.includes(input)) return true;
    return false;
  }

  listJobs() {

    let parameters = new HttpParams();

    try {parameters = parameters.append('language',this.params.language.toString()); } catch{};
    try {parameters = parameters.append('techstack',this.params.techstack.toString());} catch{};
    try {parameters = parameters.append('title',this.params.title.toString());} catch{};
    try {parameters = parameters.append('jobtype',this.params.jobtype.toString());} catch{};
    try {parameters = parameters.append('jobclosed',this.params.jobclosed.toString());} catch{};
    
    this.StorageService.setSearchParams(this.params);
    this.http.get<AUTHjobDTO>(this.url+"?"+parameters).subscribe(
      response=>{
        this.job=response;
    });
  }


  calcInvoiceSalary(employeeSalary:number){
    return Math.round(((((employeeSalary*1.352)/12)*13)/160)*168);
  }

  calcPureSalary(employeeSalary:number){

    var danZaklad = employeeSalary-(employeeSalary*0.134);
    var dan19 = danZaklad*0.19;
    var pureSalary = danZaklad - dan19;
    return Math.round(
      pureSalary
    )
  }

  createJobx(){
    this.router.navigateByUrl('/createJob');
  }

  createJob(form: NgForm){
    this.modalRef.hide();    
    this.http.post<jobOfferDTO>(this.url,form.value).subscribe(
      result => {
        this.modalRef?.hide();
        this.openSnackBar('Job Created',null)
        location.reload;
      },
      error =>{
        //this.openSnackBar('An error occured:' + error.error.error,null)
      }
    );
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
    this.router.navigateByUrl('/authjobdetail/'+row.jobUrl)
  }

  selectLanguage(lang:string){
    this.params.language=lang;
    this.listJobs();
  }


  closedJobsToggle(){
    this.toggleClosedJobsOnly = !this.toggleClosedJobsOnly;
    this.params.jobclosed = this.toggleClosedJobsOnly;
    this.StorageService.setSearchParams(this.params);
    this.listJobs();
  }

  toggleSelection(chip: MatChip, chipList:MatChipList) {

    chip.selected = !chip.selected;
    this.params.jobtype = "";
    chipList.chips.forEach((chip) => {
      if(chip.selected === true) {
        this.params.jobtype = this.params.jobtype.concat(chip.value+",")
      }
    })
    this.listJobs();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-xl' }));
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 4000,
      panelClass: ['dark-snackbar','d-flex','justify-content-center','fva','l','zindex-tooltip'],
      verticalPosition : 'bottom',
      horizontalPosition: 'right'
    });
  }

  assembleUrl(form: NgForm){

    let title:any = form.value.jobTitle;    
    title = title.toLowerCase();
       
    let suffix:string = Math.random().toString(10).substr(2,4);
  

    for(var i=1;i<10;i++) {
    title = title.replace("--","-");
    title = title.replace(" ","-");//space
    title = title.replace(" ","-");//tab
    title = title.replace("(","-");
    title = title.replace(")","-");
    title = title.replace("#","-");
    title = title.replace("/","-");
    title = title.replace("\\","-");
    title = title.replace("@","-");
    title = title.replace("&","-");
    title = title.replace("*","-");
    title = title.replace("%","-");
    title = title.replace("$","-");
    title = title.replace("+","-");
    title = title.replace("!","-");
    title = title.replace("`","-");
    title = title.replace("~","-");
    title = title.replace(":","-");
    title = title.replace(";","-");
    title = title.replace(",","-");
    title = title.replace("/-","/");
    title = title.replace(".","/");
    }
    let finalUrl = title+"-"+suffix;
    finalUrl = finalUrl.toLowerCase()
    finalUrl = finalUrl.replace('--','-');
    this.cloudUrl=finalUrl;
    }

    JobTypeSelected(chip: MatChip, chipList:MatChipList) {

      chip.selected = !chip.selected;
      chipList.chips.forEach((chip) => {
        if(chip.selected === true) {
          this.jobTypeHelperVar = chip.value;
        }
      })
    }

    JobCitySelected(chip: MatChip, chipList:MatChipList) {

      chip.selected = !chip.selected;
      chipList.chips.forEach((chip) => {
        if(chip.selected === true) {
          this.jobCityHelperVar = chip.value;
        }
      })
    }

    JobStateSelected(chip: MatChip, chipList:MatChipList) {

      chip.selected = !chip.selected;
      chipList.chips.forEach((chip) => {
        if(chip.selected === true) {
          this.jobStateHelperVar = chip.value;
        }
      })
    }

      
  addJobType(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let isThere:boolean = false
    if (value) {
      this.jobTypeService.dataFromDb().subscribe(response => {
        response.forEach((jobType: any) => {
          
          if(jobType.type === value) {
            isThere = true;
          };
        });

        if(isThere === false) {
          response.push({typeChips: value});
          this.jobType = response;
          this.jobTypeService.dataToDb({typeChips: value});

        }
      })
      this.modalRef.hide();
    }}

  addJobCity(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let isThere:boolean = false
    if (value) {
      this.jobCityService.dataFromDb().subscribe(response => {
        response.forEach((jobCity: any) => {
          
          if(jobCity.citychips === value) {
            isThere = true;
          };
        });

        if(isThere === false) {
          response.push({cityChips: value});
          this.jobCity = response;
          this.jobCityService.dataToDb({cityChips: value});

        }
      })
      this.modalRef.hide();
    }}

  addJobState(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let isThere:boolean = false
    if (value) {
      this.jobStateService.dataFromDb().subscribe(response => {
        response.forEach((jobState: any) => {
          
          if(jobState.statechips === value) {
            isThere = true;
          };
        });

        if(isThere === false) {
          response.push({stateChips: value});
          this.jobState = response;
          this.jobStateService.dataToDb({stateChips: value});

        }
      })
      this.modalRef.hide();
    }}
  

}