import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home/home.component';
import { NavComponent } from './nav/nav/nav.component';
import { JoblistComponent } from './jobs/joblist/joblist.component';
import { JobdetailComponent } from './jobs/jobdetail/jobdetail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './footer/footer/footer.component';
import { Section2Component } from './section2/section2/section2.component';
import { Section1Component } from './section1/section1/section1.component';
import { HeadComponent } from './head/head/head.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatSelectModule} from '@angular/material/select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { InformationComponent } from './sectionInfo/information/information.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContactComponent } from './sectionContact/contact/contact.component';
import { CreateJobComponent } from './LoggedIn/create-job/create-job.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { TooltipModule, } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './_login/login/login.component';
import { AUTHJoblistComponent } from './LoggedIn/joblist/auth-joblist/auth-joblist.component';
import { AuthJobdetailComponent } from './LoggedIn/jobdetail/auth-jobdetail/auth-jobdetail.component';
import { AuthVisitorsComponent } from './LoggedIn/visitors/auth-visitors/auth-visitors.component';
import { AuthApplicationsComponent } from './LoggedIn/applications/auth-applications/auth-applications.component';
import { AuthMessagesComponent } from './LoggedIn/messages/auth-messages/auth-messages.component';
import { JwtInterceptor } from './_interceptors/jwtinterceptor.interceptor';
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS} from '@angular/material/chips';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { JobdetailPrintComponent } from './jobs/jobdetail-print/jobdetail-print/jobdetail-print.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { Section3Component } from './section3/section3.component';
import { Section4Component } from './section4/section4.component';
import { Section5Component } from './section5/section5.component';
import { FAQComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    JoblistComponent,
    JobdetailComponent,
    FooterComponent,
    Section2Component,
    Section1Component,
    HeadComponent,
    InformationComponent,
    ContactComponent,
    CreateJobComponent,
    LoginComponent,
    AUTHJoblistComponent,
    AuthJobdetailComponent,
    AuthVisitorsComponent,
    AuthApplicationsComponent,
    AuthMessagesComponent,
    JobdetailPrintComponent,
    Section3Component,
    Section4Component,
    Section5Component,
    FAQComponent,
    AboutComponent,
    UserManagementComponent,
    AdminPanelComponent,
    HasRoleDirective,
    RolesModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatSnackBarModule,
    MatChipsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    MatCheckboxModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatRadioModule,
    TabsModule.forRoot()
    
  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true},
    {provide: MAT_RADIO_DEFAULT_OPTIONS,  useValue: { color: 'warn' }}
    /*
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }*/
    //{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1000}}
   ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
