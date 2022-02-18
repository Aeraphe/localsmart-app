import { Component, OnInit } from '@angular/core';
import { HeaderNavService } from "../../shared/services/header-nav.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private appHeaderService:HeaderNavService) { }

  ngOnInit(): void {
    this.appHeaderService.open();
  }

}
