import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiotapiService } from './services/riotapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public riot: RiotapiService,
              private router: Router, ){}

  title = 'ritopls';

  ngOnInit(): void {
    this.router.navigate(['']);
  }
}
