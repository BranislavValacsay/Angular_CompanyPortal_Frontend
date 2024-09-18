import { ENUM_jobTechstack } from "../models/job-techstack";

export class jobOfferDTO {

    guid:string;
    jobTitle:string;
    language:string;
    state:string;
    city:string;
    jobDescription:string;
    yourProfile:string;
    youCanExpect:string;
    furtherInformation:string;
    startDate:string;
    salary:number;
    timesSeen:number;
    source:string;
    sourceId:number;
    sourceUrl:string;
    techStack:ENUM_jobTechstack[];
    tasks:string;
    jobUrl:string;
    jobClosed:boolean;
    jobType:string;
    primarySkill:ENUM_jobTechstack;
    secondarySkll:string;
}
