import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jobOfferDTO } from 'src/app/DTO/jobOfferDTO';
import { environment } from 'src/environments/environment';
import { MatChip, MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { JobTypeService } from 'src/app/_services/job-type.service';
import { COMMA, ENTER, } from '@angular/cdk/keycodes';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ENUM_jobType } from 'src/app/models/ENUM_jobType';
import { ENUM_jobCity } from 'src/app/models/ENUM_jobCity';
import { ENUM_jobState } from 'src/app/models/ENUM_jobState';
import { ENUM_jobTechstack } from 'src/app/models/job-techstack';
import { JobCityService } from 'src/app/_services/job-city.service';
import { JobStateService } from 'src/app/_services/job-state.service';
import { JobTechstackService } from 'src/app/_services/job-techstack.service';
import { jobtechstackcategory } from 'src/app/models/job-techstack-category';
import { JobTechstackCategoryService } from 'src/app/_services/job-techstack-category.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-auth-jobdetail',
  templateUrl: './auth-jobdetail.component.html',
  styleUrls: ['./auth-jobdetail.component.css']
})
export class AuthJobdetailComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private jobTypeService: JobTypeService,
    private jobCityService: JobCityService,
    private jobStateService: JobStateService,
    private jobTechStackService: JobTechstackService,
    private jobTechStackServiceCategory: JobTechstackCategoryService,
    private router: Router,
    private modalService: BsModalService,
    private _snackBar: MatSnackBar)
    {
    //job type from DB to assemble chips menu, this is not part of object
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
    //job techstack category
    this.jobTechStackServiceCategory.dataFromDb().subscribe(response => {
      this.jobTechStackCategory = response;
    });



    if(environment.production) {
      this.frontEndUrl = "https://www.netrunners.com/";
    }
    else{
      this.frontEndUrl = "http://localhost:4200/"
    }
   }

  job:jobOfferDTO;
  id:string;
  name:string="";
  url:string = environment.baseurl + "auth_job/";
  frontEndUrl:string;

  jobUrl:string = "https://www.netrunners.com/detail/";
  printUrl: string = "http://www.netrunners.com/jobdetail-print/"
  upperSalary:number
  invoice:number;
  upperInvoice: number;

  modalError:boolean=false;
  ipaddress:any;

  modalRef?: BsModalRef;
  
  jobType: ENUM_jobType; //used for enumeration of job type field from backend to chips
  jobCity: ENUM_jobCity;
  jobState:ENUM_jobState;
  jobTechStack:ENUM_jobTechstack;
  jobTechStackCategory:jobtechstackcategory;
  categoryHelper:string;
  //skillArray = new Set([]);

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  ngOnInit(): void {
    this.getJobDetails();
  }

  onSelect(param:string){
    this.categoryHelper = param;
  }

  getJobDetails() {

    let params = new HttpParams();
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

  updateJobDetails(form: NgForm) {
    var jobGuid = "";
    jobGuid = this.job.guid;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.id = this.route.snapshot.paramMap.get('url');
      this.http.patch<jobOfferDTO>(this.url+jobGuid,form.value).subscribe(
        response=>{
          this.router.navigateByUrl("authjobdetail/"+this.job.jobUrl);
          this.modalRef.hide();
          this.openSnackBar('Job Updated',null)
        },
        error =>{
          this.openSnackBar("ERROR:"+error.error.error,null)
        }
      );
    },0);

    
    }

  removeJob(){
  }


  assembleUrl(){

      let title:string = this.job.jobTitle
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
        title = title.replace(";","-");
        title = title.replace(",","-");
        title = title.replace("/-","-");
        title = title.replace(".","-");
    };
      this.job.jobUrl= title+"-"+suffix.toLowerCase()
      this.job.jobUrl = this.job.jobUrl.replace('--','-');
  }

  chipJobTypeSelect(input:any){
    if (this.job.jobType === input) {
      return true;}
    return false;
  }

  chipJobCitySelect(input:any){
    if (this.job.city === input) {
      return true;}
    return false;
  }

  chipJobStateSelect(input:any){
    if (this.job.state === input) {
      return true;}
    return false;
  }

  chipJobTechStackSelect(input:any){
    let isEnumSkillOnJob:boolean = false

    this.job.techStack.forEach(element => {
      if (element.skillChips === input) {
        isEnumSkillOnJob = true;}
    });

    return isEnumSkillOnJob;
  }

  JobTypeSelected(chip: MatChip, chipList:MatChipList) {

    chip.selected = !chip.selected;
    chipList.chips.forEach((chip) => {
      if(chip.selected === true) {
        this.job.jobType = chip.value;
      }
    })
  }

  JobCitySelected(chip: MatChip, chipList:MatChipList) {

    chip.selected = !chip.selected;
    chipList.chips.forEach((chip) => {
      if(chip.selected === true) {
        this.job.city = chip.value;
      }
    })
  }

  JobStateSelected(chip: MatChip, chipList:MatChipList) {


  }

  JobTechstackSelected(chip: MatChip,chipList:MatChipList,jobId:number,skillId:number) {

    chip.selected = !chip.selected;

   if(chip.selected) {
     this.jobTechStackService.insertTechStackDataToDb({jobId: jobId,techStackSkillId: skillId});
    }

    else
    {
      this.jobTechStackService.deleteTechStackDataFromDb({jobId: jobId,techStackSkillId: skillId});
    }

  }

  JobTechstackSelected2(jobId:number,skillId:number,skillHtmlId:string,e:MatCheckboxChange) {
    if(!e.checked) {
      this.jobTechStackService.insertTechStackDataToDb({jobId: jobId,techStackSkillId: skillId});
     }

     else
     {
       this.jobTechStackService.deleteTechStackDataFromDb({jobId: jobId,techStackSkillId: skillId});
     }
  }

  openPrintVersion(url:string){
    this.router.navigateByUrl('/jobdetail-print/'+url);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-xl' }));
  }

  addJobTechstack(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let isThere:boolean = false
    if (value) {
      this.jobTechStackService.dataFromDb().subscribe(response => {
        response.forEach((jobTechStack: any) => {

          if(jobTechStack.typeChips === value) {
            isThere = true;
          };
        });

        if(isThere === false) {
          response.push({skillChips: value});
          this.jobTechStack = response;
          this.jobTechStackService.dataToDb({skillChips: value, categoryId: this.categoryHelper}).subscribe(res => {
            this.jobTechStackService.dataFromDb().subscribe(response => {
              this.jobTechStack = response;
            });
          })
        }
      })
      this.modalRef.hide();
    }}

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action,{
        duration: 4000,
        panelClass: ['dark-snackbar','d-flex','justify-content-center','fva','l','zindex-tooltip'],
        verticalPosition : 'bottom',
        horizontalPosition: 'center'
      });
    }
}

