import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {getNowTime} from "core-utils";
import { NavComponent } from "./components/nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-crud-sample';

  constructor(){
    console.log(getNowTime())
  }
}
