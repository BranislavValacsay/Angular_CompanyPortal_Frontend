import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { user } from '../models/user';
import { AccountService } from '../_services/accountService';


@Directive({
  selector: '[appHasRole]' // *appHasRole='["Admin"]'
})
export class HasRoleDirective implements OnInit{

  @Input() appHasRole: string[];
  user:user = {} as user;

  constructor(
    private viewContainerRef: ViewContainerRef, 
    private templateRef : TemplateRef<any>, 
    private accountService: AccountService
    ) 
    {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user: user) => {
        if(user) this.user = user;
        }
          })
        }

  ngOnInit(): void {
      if (!this.user?.roles || this.user === null) {
        this.viewContainerRef.clear();
        return;
      }

      if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
  }

}