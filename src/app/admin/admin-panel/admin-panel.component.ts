import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { user } from 'src/app/models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private adminService: AdminService,
   private modalService: BsModalService) { }

   users:user[] = [];
   roles:any[];
   bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
   availableRoles : any[] = [
    {name: 'Admin', value:'Admin'},
    {name: 'Recruiter', value:'Recruiter'},
    {name: 'Employee', value:'Employee'},
    {name: 'Contractor', value:'Contractor'}
  ];
  ngOnInit(): void {
      this.getUsersWithRoles();
  }
  
  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => this.users = users
    })
  }

  openRolesModal(user:any) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.udpateSelectedRoles.subscribe((values: any[]) => {
      const rolesToUpdate = {
        roles: [...values.filter((el:any) => el.checked === true).map((el:any) => el.name)]
      };
      if(rolesToUpdate) {        
        this.adminService.updateUserRoles(user.userName, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
        })
      }
    })
  }
  
  private getRolesArray(user:user){
    const roles: string[] = [];
    const userRoles = user.roles;
    const availableRoles : any[] = [
      {name: 'Admin', value:'Admin'},
      {name: 'Recruiter', value:'Recruiter'},
      {name: 'Employee', value:'Employee'},
      {name: 'Contractor', value:'Contractor'}
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if(role.name === userRole){
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch){
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }
}
