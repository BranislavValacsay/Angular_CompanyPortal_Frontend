import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(private router:Router) { }

  binmsg1:string = "01110100 01101000 01101001 01110011 00100000";
  binmsg2:string = "01000001 01101011 00100000 01101101 01101001"
  binmsg3:string = "01110010 01100001 01111010 00100000 01100010"
  binmsg4:string = "01110101 01100100 01100101 00100000 01110000"
  binmsg5:string = "11100010 01101001 01111010 01101110 01100001"
  bottomMessage:string = `01110100 01101000 01101001 01110011 00100000 01000001 01101011 00100000 01101101 01101001 01110010 01100001 01111010 00100000 01100010 01110101 01100100 01100101 00100000 01110000 11100010 01101001 01111010 01101110 01100001 01101001 01111010 01101110 01111010 00100000 01100010 01110101`;

  hexamessage: string = `
  54 65 72 6d
  69 6e 61 74
  6f 72 20 32
  20 69 73 20
  62 65 73 74
  20 6d 6f 76
  69 65 20 65
  76 65 72 20
  6d 61 64 65
  2e 20 54 68
  61 6e 6b 20
  79 6f 75 20
  41 72 6e 6f
  6c 64 20 21`

  ngOnInit(): void {

  }

  navToSearch()
  {
    this.router.navigateByUrl('/project');
  }

}
