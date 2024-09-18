import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { jobOfferDTO } from 'src/app/DTO/jobOfferDTO';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { JobTechstackCategoryService } from 'src/app/_services/job-techstack-category.service';
import { jobtechstackcategory } from 'src/app/models/job-techstack-category';
import { Clipboard } from '@angular/cdk/clipboard';
import { AccountService } from 'src/app/_services/accountService';
import { Observable  } from 'rxjs';
import { user } from 'src/app/models/user';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jobTitle } from 'src/app/models/jobTitle';
import { jobDescription } from 'src/app/models/jobDescription';
import { jobTasks } from 'src/app/models/jobTasks';
import { jobYourProfile } from 'src/app/models/jobYourProfile';
import { jobYouCanExpect } from 'src/app/models/jobYouCanExpect';
import { jobFurtherInformation } from 'src/app/models/jobFurtherInformation';
import { JobTypeService } from 'src/app/_services/job-type.service';
import { JobCityService } from 'src/app/_services/job-city.service';
import { JobStateService } from 'src/app/_services/job-state.service';
import { JobTechstackService } from 'src/app/_services/job-techstack.service';
import { ENUM_jobType } from 'src/app/models/ENUM_jobType';
import { ENUM_jobCity } from 'src/app/models/ENUM_jobCity';
import { ENUM_jobState } from 'src/app/models/ENUM_jobState';
import { ENUM_jobTechstack } from 'src/app/models/job-techstack';
import { CommServiceService } from 'src/app/_services/comm-service.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { editMode } from 'src/app/models/editMode';
import { EditmodeService } from 'src/app/_services/editmode.service';
import { salary } from 'src/app/models/salary';
import { MatChip, MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { jobType } from 'src/app/models/jobType';
import { ENUM_jobLanguage } from 'src/app/models/ENUM_jobLanguage';
import { JobLanguageService } from 'src/app/_services/job-language.service';
import { jobLanguage } from 'src/app/models/jobLanguage';
import { jobCity } from 'src/app/models/jobCity';
import { jobState } from 'src/app/models/jobState';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})


export class JobdetailComponent implements OnInit {
  @ViewChild('jobName') searchElement: ElementRef;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private clipboard: Clipboard,
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    private jobTypeService: JobTypeService,
    private jobLanguageservice:JobLanguageService,
    private jobCityService: JobCityService,
    private jobStateService: JobStateService,
    private jobTechStackService: JobTechstackService,
    private jobTechStackServiceCategory: JobTechstackCategoryService,
    private commservice: CommServiceService,
    private editModeService:EditmodeService
    )
    
    {
      this.jobTechStackServiceCategory.dataFromDb().subscribe(response => {
        this.jobTechStackCategory = response;
      });

      this.accountService.currentUser$.pipe(take(1)).subscribe(user=> this.user = user);
      
      //search parameters saved from form to local session storage
      this.editModeService.currentMode$.pipe(take(1)).subscribe(result => this.EditEnabled = result.editmode);
  
      //job type from DB to assemble chips menu, this is not part of object
      this.jobTypeService.dataFromDb().subscribe(response => {
        this.ENUM_jobType = response;
      });
      this.jobLanguageservice.dataFromDb().subscribe(response => {
        this.ENUM_jobLanguage = response;
      })
      //job city
      this.jobCityService.dataFromDb().subscribe(response => {
        this.ENUM_jobCity = response;
      });
      //job state
      this.jobStateService.dataFromDb().subscribe(response => {
        this.ENUM_jobState = response;
      });
      //job techstack
      this.jobTechStackService.dataFromDb().subscribe(response => {
        this.ENUM_jobTechStack = response;
      });
      //job techstack category
      this.jobTechStackServiceCategory.dataFromDb().subscribe(response => {
        this.jobTechStackCategory = response;
      });
  }

  spin1 ='sp1';
  idFromRoute:string;

  url:string = environment.baseurl +"p_JobOfferList/";
  jobUrl:string =  environment.mainurl+"/detail/";
  applyUrl:string = environment.baseurl +"ApplyJob/";

  beenApplied:boolean=false;

  modalRef?: BsModalRef;
  modalRef2?: BsModalRef; //nested modal
  modalError:boolean=false;
  config = {
    animated: true
  };

  upperSalary:number
  invoice:number;
  upperInvoice: number;

  user:user;
  currentUser$: Observable<user> | undefined;

  job:jobOfferDTO;

  //enumeration classes
  ENUM_jobType: ENUM_jobType; //used for enumeration of job type field from backend to chips
  ENUM_jobLanguage: ENUM_jobLanguage;
  ENUM_jobCity: ENUM_jobCity;
  ENUM_jobState:ENUM_jobState;
  ENUM_jobTechStack:ENUM_jobTechstack[];
  
  jobTechStackCategory:jobtechstackcategory;
  jobTitle:jobTitle = new jobTitle;
  jobDescription:jobDescription = new jobDescription;
  jobTasks:jobTasks = new jobTasks;
  jobYourProfile:jobYourProfile = new jobYourProfile;
  jobYouCanExpect:jobYouCanExpect = new jobYouCanExpect;
  jobFurtherInformation:jobFurtherInformation = new jobFurtherInformation;

  //not enumeration, these are used to dispatch PUT/POST requests
  jobType:jobType = new jobType;
  jobLanguage:jobLanguage = new jobLanguage;
  jobCity:jobCity = new jobCity;
  jobState:jobState = new jobState;



  salary:salary = new salary;

  editJobName:boolean = false;
  EditEnabled?:boolean;// = false;

  //modals

  jobTypeHelperVar : string = "";

  
  //rows:number;

    ngOnInit() {
      //this.currentUser$ = this.accountService.currentUser$;
      //console.log(this.user);
      window.scroll({
        top:0,
        behavior: 'smooth'
      });
    
    //retrieve lines for Description !
        //var lines = data.jobDescription.split("\n");
        //this.rows = lines.length;
     this.getJob().subscribe((data) => {
        this.job = data;
      });

    }

    getJob(): Observable<any> {
      this.idFromRoute = this.route.snapshot.paramMap.get('url');
      return this.commservice.loadJob(this.idFromRoute);
      }

      
    editName(){
      if(this.user){
        this.editJobName = true;
        setTimeout(()=>{ // this will make the execution after the above boolean has changed
          this.searchElement.nativeElement.focus();
        },0);
      }

    }

    editNameFinish(){
      this.editJobName = false;
      var putUrl= environment.baseurl+"Auth_Job_JobTitle";

      this.jobTitle.JobGuid = this.job.guid;
      this.jobTitle.JobTitle = this.job.jobTitle;
      this.http.put<jobTitle>(putUrl,this.jobTitle).subscribe(
        response=>{

        },error => {
          this.http.post<jobTitle>(putUrl,this.jobTitle).subscribe();
        }
      );
    }

    editDescriptionFinish()
    {
      //this.EditEnabled = false;
      var putUrl= environment.baseurl+"Auth_Job_Description";

      this.jobDescription.JobGuid = this.job.guid;
      this.jobDescription.JobDescription = this.job.jobDescription;
      this.http.put<jobDescription>(putUrl,this.jobDescription).subscribe(
        response=>{

        },error => {
          this.http.post<jobDescription>(putUrl,this.jobDescription).subscribe();
        }
      );
    }

    editTasksFinish()
    {
      //this.EditEnabled = false;
      var putUrl= environment.baseurl+"Auth_Job_Tasks";

      this.jobTasks.JobGuid = this.job.guid;
      this.jobTasks.JobTasks = this.job.tasks;
      this.http.put<jobTasks>(putUrl,this.jobTasks).subscribe(
        response=>{
          
        },error => { console.log(error.error.error)
          this.http.post<jobTasks>(putUrl,this.jobTasks).subscribe();
        }
      );
    }

    editYourProfileFinish()
    {
      //this.EditEnabled = false;
      var putUrl= environment.baseurl+"Auth_Job_YourProfile";

      this.jobYourProfile.JobGuid = this.job.guid;
      this.jobYourProfile.YourProfile = this.job.yourProfile;
      this.http.put<jobYourProfile>(putUrl,this.jobYourProfile).subscribe(
        response=>{
          
        },error => { console.log(error.error.error)
          this.http.post<jobYourProfile>(putUrl,this.jobYourProfile).subscribe();
        }
      );
    }

    YouCanExpectFinish()
    {
      //this.EditEnabled = false;
      var putUrl= environment.baseurl+"Auth_Job_YouCanExpect";

      this.jobYouCanExpect.JobGuid = this.job.guid;
      this.jobYouCanExpect.YouCanExpect = this.job.youCanExpect;
      this.http.put<jobYouCanExpect>(putUrl,this.jobYouCanExpect).subscribe(
        response=>{
          
        },error => { console.log(error.error.error)
          this.http.post<jobYouCanExpect>(putUrl,this.jobYouCanExpect).subscribe();
        }
      );
    }

    JobTypeFinish(jobtypeID:number,chip:string)
    {
    //this.EditEnabled = false;
        var putUrl= environment.baseurl+"Auth_Job_JobType";
        this.jobType.JobGuid = this.job.guid;
        this.jobType.JobTypeId = jobtypeID;
        this.http.put<jobType>(putUrl,this.jobType).subscribe(
          response=>{
            this.job.jobType = chip;
            
          },error => { //console.log(error.error.error)
            this.http.post<jobType>(putUrl,this.jobType).subscribe();
            this.job.jobType = chip;
          }
        );
    }

    JobLanguageFinish(jobLanguageID:number,chip:string){
      //this.EditEnabled = false;console.log();
      var putUrl= environment.baseurl+"AUTH_Job_Language";
      this.jobLanguage.JobGuid = this.job.guid;
      this.jobLanguage.JobLanguageId = jobLanguageID;
      this.http.put<jobLanguage>(putUrl,this.jobLanguage).subscribe(
        response=>{
          this.job.language = chip;
        },error => {
          this.http.post<jobLanguage>(putUrl,this.jobLanguage).subscribe();
          this.job.language = chip;
        }
      );
    }
    JobStateFinish(jobStateID:number,chip:string){
      //this.EditEnabled = false;console.log();
      var putUrl= environment.baseurl+"Auth_Job_State";
      this.jobState.JobGuid = this.job.guid;
      this.jobState.JobStateId = jobStateID;
      this.http.put<jobState>(putUrl,this.jobState).subscribe(
        response=>{
          this.job.state = chip;
        },error => {
          this.http.post<jobLanguage>(putUrl,this.jobLanguage).subscribe();
          this.job.state = chip;
        }
      );
    }
    JobCityFinish(jobCityID:number,chip:string){
      //this.EditEnabled = false;console.log();
      var putUrl= environment.baseurl+"Auth_Job_City";
      this.jobCity.JobGuid = this.job.guid;
      this.jobCity.JobCityId = jobCityID;
      this.http.put<jobCity>(putUrl,this.jobCity).subscribe(
        response=>{
          this.job.city = chip;
        },error => {
          this.http.post<jobCity>(putUrl,this.jobCity).subscribe();
          this.job.city = chip;
        }
      );
    }


    FurtherInformationFinish()
    {
      //this.EditEnabled = false;console.log();
      var putUrl= environment.baseurl+"Auth_Job_FurtherInformation";

      this.jobFurtherInformation.JobGuid = this.job.guid;
      this.jobFurtherInformation.FurtherInformation = this.job.furtherInformation;
      this.http.put<jobFurtherInformation>(putUrl,this.jobFurtherInformation).subscribe(
        response=>{
          
        },error => { console.log(error.error.error)
          this.http.post<jobFurtherInformation>(putUrl,this.jobFurtherInformation).subscribe();
        }
      );
    }

    saveSalary()
    {
      var xurl = environment.baseurl+"AUTH_Job_Salary";
      
      this.salary.JobGuid = this.job.guid;
      this.salary.Salary = this.job.salary;
      this.http.put<salary>(xurl,this.salary).subscribe();
      this.modalRef?.hide()
      this.openSnackBar('Mzda bola zmenena na hodnotu: '+ this.job.salary ,null)
    }

    openModal(template: TemplateRef<any>) {
      this.modalError = false;
      this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg',animated:true },);
      }

    openModalSecured(template: TemplateRef<any>) {
      this.modalError = false;
      if(this.user && this.EditEnabled == true){
        this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg' });
        }
      }

    openSecondModal(template: TemplateRef<any>) {
      this.modalError = false;
      this.modalRef = this.modalService.show(template, { id: 2, class: 'modal-lg' });
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

    clipbrd(myurl:string){
      this.clipboard.copy(myurl);
      this.openSnackBar('Adresa bola skopírovaná do schránky',null)
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action,{
        duration: 2000,
        panelClass: ['dark-snackbar','d-flex','justify-content-center','fva','l']
      });
    }


  chipJobTechStackSelect(input:any){
    let isEnumSkillOnJob:boolean = false

    this.job.techStack.forEach(element => {
      if (element.skillChips === input) {
        isEnumSkillOnJob = true;}
    });

    return isEnumSkillOnJob;
  }

  JobTechstackSelected(jobguid:string,skillId:number,skillChips:string,e:MatCheckboxChange) {
    if(!e.checked) {
      this.jobTechStackService.insertTechStackDataToDb({jobGuid: jobguid,techStackSkillId: skillId});
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.getJob().subscribe((data) => {
          this.job = data;
        });
      },0);
 
     }

     else
     {
       this.jobTechStackService.deleteTechStackDataFromDb({jobGuid: jobguid,techStackSkillId: skillId});
       setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.getJob().subscribe((data) => {
          this.job = data;
        });
      },0);
  
     }

  }


  setEditMode(){
    this.EditEnabled = !this.EditEnabled;
    const mode:editMode = new editMode();
    mode.editmode = this.EditEnabled;
    this.editModeService.setEditMode(mode);
  }

  JobTypeSelected(chip: MatChip, chipList:MatChipList, jobType_id:number) {

    chip.selected = !chip.selected;
    chipList.chips.forEach((chip) => {
      if(chip.selected === true) {
      this.jobTypeHelperVar = chip.value;
      }
    })
  }

  JobLanguageSelected(chip: MatChip, chipList:MatChipList, id:number){
    chip.selected = !chip.selected;
  }

  JobStateSelected(chip: MatChip, chipList:MatChipList, id:number){
    chip.selected = !chip.selected;
  }
  JobCitySelected(chip: MatChip, chipList:MatChipList, id:number){
    chip.selected = !chip.selected;
  }

  PrimarySkillSelected(){
    //console.log(this.job);
  }

  SecondarySkillSelected(){

  }
  
  chipJobTypeSelect(input:any){//console.log(this.job.jobType == input)
    if (this.job.jobType == input) {
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
}