import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.css']
})
export class Section1Component implements OnInit {

  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router) { }

  url:string = environment.baseurl +"countcontoller";
  jobCount:any;

  ponukame:string = `Našou špecializáciou je trh Rakúsky trh. Dodávame slovenských odborníkov významným spoločnostiam z oblasti telekomunikácií, energetiky, mobilných operátorov atď...
  Sme presvedčení, že naši špičkový experti v rôznych oblastiach IT majú čo ponúknuť západnému klientovi.
  Svojim budúcim i súčasným partnerom, ktorí chcú zostať nezávislí pomáhame so zakladaním SRO`
    dot1:string = `
pozri si projekty
vyber ktoré ťa zaujali
uploadni CV
nechaj na seba kontakt`;
dot2:string = `
spravíme pohovor
prejdeme si feedback
zvolíš si formu spolupráce
založíme Ti spoločnosť,
alebo Ťa zamestnáme`
dot3:string = `
podpíšeme zmnluvu
pracuj na projekte
pošli faktúru
zarábaj
`

  ngOnInit(): void {
  }

  getJobCount() {
    this.http.get(this.url).subscribe(response=>{
      this.jobCount=response;
  });
  }

  loadJobList(){
    this.router.navigateByUrl('/joblist');
  }

}
