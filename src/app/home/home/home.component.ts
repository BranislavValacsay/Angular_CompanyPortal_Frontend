import { Component, OnInit, Sanitizer } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  reveal:boolean = false;

  lorem1:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam justo sem, malesuada vitae placerat et, venenatis at nulla. Proin a nisl erat. Phasellus pharetra metus eget mi rutrum, non venenatis leo eleifend. Integer auctor lectus eu nisi vestibulum, non dapibus tellus sagittis. Sed purus massa, convallis at sagittis eget, consectetur at risus.";
  lorem2:string = "Nullam et molestie risus, ut placerat turpis. Ut fermentum leo vel lorem interdum luctus. Fusce venenatis turpis velit. Duis ornare massa in sem eleifend posuere. In accumsan, est a finibus cursus, eros urna consectetur nibh, nec finibus ipsum neque ut erat. Aliquam erat volutpat. Donec felis mauris, suscipit a mauris vel, tristique interdum leo. Integer at vestibulum orci.";
  lorem3:string = "Nam sed ultrices dui, eget dictum velit. Nullam vitae felis imperdiet urna aliquet lacinia. Integer vitae ex scelerisque, pellentesque erat nec, venenatis orci. Pellentesque facilisis gravida ligula, accumsan fringilla magna accumsan a. Etiam convallis facilisis massa, ac egestas lectus ultrices et. Nam nisi risus, tincidunt at egestas sit amet, pharetra ut lectus.";
  lorem4:string = "Nam sed ultrices dui, eget dictum velit. Nullam vitae felis imperdiet urna aliquet lacinia. Integer vitae ex scelerisque, pellentesque erat nec, venenatis orci. Pellentesque facilisis gravida ligula, accumsan fringilla magna accumsan a. Etiam convallis facilisis massa, ac egestas lectus ultrices et. Nam nisi risus, tincidunt at egestas sit amet, pharetra ut lectus.";

  ngOnInit(): void {
    window.scroll(0,0);
  }
}
