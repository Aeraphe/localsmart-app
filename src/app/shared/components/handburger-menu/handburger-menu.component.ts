import { Component, OnInit } from '@angular/core';
import { HandburgerMenuService } from "../../services/handburger-menu.service";

@Component({
  selector: 'app-handburger-menu',
  templateUrl: './handburger-menu.component.html',
  styleUrls: ['./handburger-menu.component.scss']
})
export class HandburgerMenuComponent implements OnInit {
  private clickState = false;

  constructor(private clickService:HandburgerMenuService) {

   }

  ngOnInit(): void {
  }

  onClick = ()=>{
    this.clickState = !this.clickState;
    this.clickService.onClickHandBurger(this.clickState);
  }

}
