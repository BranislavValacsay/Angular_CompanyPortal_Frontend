import { Component, OnInit } from '@angular/core';
import { editMode } from './models/editMode';
import { searchParams } from './models/searchParams';
import { user } from './models/user';
import { AccountService } from './_services/accountService';
import { EditmodeService } from './_services/editmode.service';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'NETRUNNERS | Nation Awesome';

  constructor(
    private accountService:AccountService,
    private storageService:StorageService,
    private editModeService:EditmodeService
    ) {

  }
  
  //skillArray = new Set([]);
  /*
  export class JobdetailComponent implements OnInit {
  @ViewChild('jobName') searchElement: ElementRef;

  
  editName(){
    if(this.user){
      this.editJobName = true;
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.searchElement.nativeElement.focus();
      },0);
    }
  */

    //    chipList.chips.forEach((chip) => {

    /*
    edit ostatnych veci v job detail
    role: admin, hr, zamestnanec
    edit profilu : meno, priezvisko, tel. cislo, email, pozicia vo firme/typ kontraktu
    miesto odovzdania dochadzky
    vyplatne pasky, dokumenty a zmluvy

    dokoncit: 
    roly

    primary skill
    secondary skill
    termin nastupu
    home office
    seen count
    job offer url ??? (not source)
    job closed
    job published
    source + source id ??? + source url
    
    novy job !

    mam zaujem => drop na CVcko

    prerobit mesta na zavislost od statu !
    
    tech stack => vyhladavanie
    tech stack => pridavanie novych
    */
      
  ngOnInit(): void {

    this.setCurrentUser();
    this.setCurrentSearch();
    this.setEditMode();

  }

  setCurrentUser(){
    const user: user = JSON.parse(localStorage.getItem('user')!);
    //const user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
    //const temp: string | null = localStorage.getItem('user');
    //const user: User = JSON.parse(temp == null ? '' : temp);
    this.accountService.setCurrentUser(user);
  }

  setCurrentSearch(){
    let params:searchParams = new searchParams();
    const getSearch = JSON.parse(localStorage.getItem('search')!)//localstorage
    if (getSearch!==null) {params = getSearch;}//localstorage
    this.storageService.setSearchParams(params);
  }

  setEditMode(){
    let mode:editMode = new editMode();
    const getMode = JSON.parse(localStorage.getItem('editmode')!);
    if (getMode == null || getMode != undefined || getMode != "") mode.editmode = true;
    mode = getMode;
      this.editModeService.setEditMode(mode);
  }
}