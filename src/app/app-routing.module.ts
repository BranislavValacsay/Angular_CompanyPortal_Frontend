import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CreateJobComponent } from './LoggedIn/create-job/create-job.component';
import { JobdetailComponent } from './jobs/jobdetail/jobdetail.component';
import { JoblistComponent } from './jobs/joblist/joblist.component';
import { AuthApplicationsComponent } from './LoggedIn/applications/auth-applications/auth-applications.component';
import { AuthJobdetailComponent } from './LoggedIn/jobdetail/auth-jobdetail/auth-jobdetail.component';
import { AUTHJoblistComponent } from './LoggedIn/joblist/auth-joblist/auth-joblist.component';
import { AuthMessagesComponent } from './LoggedIn/messages/auth-messages/auth-messages.component';
import { AuthVisitorsComponent } from './LoggedIn/visitors/auth-visitors/auth-visitors.component';
import { ContactComponent } from './sectionContact/contact/contact.component';
import { InformationComponent } from './sectionInfo/information/information.component';
import { LoginComponent } from './_login/login/login.component';
import { AuthGuardService } from './AuthGuard/auth-guard.service';
import { JobdetailPrintComponent } from './jobs/jobdetail-print/jobdetail-print/jobdetail-print.component';
import { AboutComponent } from './about/about.component';
import { FAQComponent } from './faq/faq.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './AuthGuard/admin.guard';



const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'project',component:JoblistComponent},
  {path:'detail/:url',component:JobdetailComponent},
  {path:'jobdetail-print/:url',component:JobdetailPrintComponent},
  {path:'information',component:InformationComponent},
  {path:'contact',component:ContactComponent},
  {path:'login',component:LoginComponent},
  {path:'about',component:AboutComponent},
  {path:'faq',component:FAQComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuardService],
    children:[
      {path:'authjoblist',component:AUTHJoblistComponent},
      {path:'authjobdetail/:url',component:AuthJobdetailComponent},
      {path:'authapplications',component:AuthApplicationsComponent},
      {path:'authmessages',component:AuthMessagesComponent},
      {path:'visitors',component:AuthVisitorsComponent},
      {path:'createJob',component:CreateJobComponent},
      {path:'admin', component:AdminPanelComponent, canActivate: [AdminGuard]}
    ]
  },

  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
