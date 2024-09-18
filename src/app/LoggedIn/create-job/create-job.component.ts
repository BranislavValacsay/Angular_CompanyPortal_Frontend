import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jobOfferDTO } from 'src/app/DTO/jobOfferDTO';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { MatChip, MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { JobTypeService } from 'src/app/_services/job-type.service';
import { ENUM_jobType } from 'src/app/models/ENUM_jobType';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ENUM_jobCity } from 'src/app/models/ENUM_jobCity';
import { JobCityService } from 'src/app/_services/job-city.service';
import { JobStateService } from 'src/app/_services/job-state.service';
import { JobTechstackService } from 'src/app/_services/job-techstack.service';
import { ENUM_jobState } from 'src/app/models/ENUM_jobState';
import { ENUM_jobTechstack } from 'src/app/models/job-techstack';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})

export class CreateJobComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private jobTypeService: JobTypeService,
    private jobCityService: JobCityService,
    private jobStateService: JobStateService,
    private jobTechStackService: JobTechstackService,
    private modalService: BsModalService,
    private _snackBar: MatSnackBar) 
    
    {
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

   } 


url:string = environment.baseurl +"Auth_Job/";

cloudUrl:string;
youCanExpect:string=
`Fulfilling and challenging job
Engaging environment
Great and motivated team to work with
Competitive salary`;

furterInfo:string = `\n\nFreelancers are awarded accordingly.`

jobType: ENUM_jobType; //used for enumeration of job type field from backend to chips
jobCity: ENUM_jobCity;
jobState:ENUM_jobState;
jobTechStack:ENUM_jobTechstack;

jobTypeHelperVar : string = "";
jobCityHelperVar : string = "";
jobStateHelperVar : string = "";


readonly separatorKeysCodes = [ENTER, COMMA] as const;

jobClosedHelperVar:boolean = false;
modalRef?: BsModalRef;
//formControl = new FormControl(['angular']); //important
//skillArray = new Set([]); //important


  ngOnInit(): void {

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
        this.openSnackBar('An error occured:' + error.error.error,null)
      }
    );
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
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}