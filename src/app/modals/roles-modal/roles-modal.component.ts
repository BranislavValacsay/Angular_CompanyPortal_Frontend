import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {

  @Input() udpateSelectedRoles = new EventEmitter();
  user:any;
  availableRoles: any[] = [];
  selectedRoles: any[] = [];
  roles:any[];


  constructor(public bsModalRef:BsModalRef) { }

  ngOnInit(): void {
  }

  updateChecked(checkedValue:string) {
    const index=this.selectedRoles.indexOf(checkedValue);
    index !== -1 ? this.selectedRoles.splice(index,1):this.selectedRoles.push(checkedValue);
  }

  updateRoles(){
    this.udpateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }
}
