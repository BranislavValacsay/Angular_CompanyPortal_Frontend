import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { user } from 'src/app/models/user';
import { AccountService} from 'src/app/_services/accountService';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class NavComponent implements OnInit {

  //user:user;
  currentUser$: Observable<user> | undefined;
  userName:any;
  fragment: any;

  constructor(
    private accountService: AccountService,
    private router:Router,
    private viewportScroller: ViewportScroller
    ) {

   }

    darkNavToggle:boolean = false;
    language:string = "sk";

    b_home:string;
    b_projects:string;
    b_about_us:string;
    b_contact:string;
    b_login:string;
    b_logout:string;
    b_applications:string;
    b_messages:string;
    b_visitors:string;
    isExpanded:boolean=false;

    @HostListener('window:scroll') onScroll(e: Event): void {
      this.paintNavBar(e);
   }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.langChanged();
  }

  navigateAndScroll(anchor:string){
    this.router.navigateByUrl("/home");
    setTimeout(() =>this.scrollToAnchor(anchor),10);
  }

  scrollToAnchor(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
}

  getCurrentUser()
  {
      this.accountService.currentUser$.subscribe(user=> {
      try {
        this.userName = user.username;
      }
      catch {}
    },error => {
      console.log(error);
    })
  }

  toggleExpanded(){
      this.isExpanded = !this.isExpanded;
      if (this.isExpanded) {this.darkNavToggle = true}
      if ((window.scrollY < 100) && (!this.isExpanded)){this.darkNavToggle = false}
    }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  paintNavBar(e: Event): number {
    if ((window.scrollY > 1)) {
      this.darkNavToggle = true;
    }

    if ((window.scrollY < 1) && (!this.isExpanded) ) {
      this.darkNavToggle = false;
    }
    return window.scrollY;
  }  

  langChanged(){

    if (this.language === "eng" || this.language == null) {
      this.b_home = "Home";
      this.b_projects = "Projects";
      this.b_about_us = "About Us";
      this.b_contact = "Contact";
      this.b_login = "Login";
      this.b_logout = "Logout";
      this.b_applications = "Applications";
      this.b_messages = "Messages";
      this.b_visitors = "Visitors";

    }

    if (this.language === "sk" ) {
      this.b_home = "Domov";
      this.b_projects = "Voľné pozície";
      this.b_about_us = "O nás";
      this.b_contact = "Kontakt";
      this.b_login = "Pre zamestnancov";
      this.b_logout = "Odhlásenie";
      this.b_applications = "Záujemcovia";
      this.b_messages = "Správy";
      this.b_visitors = "Návštevy";
    }
  }

}
