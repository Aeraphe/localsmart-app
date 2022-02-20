import { Component, OnInit } from '@angular/core';
import { HandburgerMenuService } from '../../services/handburger-menu.service';
import { OverlayService } from "../../services/overlay.service";

@Component({
  selector: 'app-handburger-menu',
  templateUrl: './handburger-menu.component.html',
  styleUrls: ['./handburger-menu.component.scss'],
})
export class HandburgerMenuComponent implements OnInit {
  clickState = false;

  constructor(private clickService: HandburgerMenuService,private appOverlayService:OverlayService) {
    this.clickService.getHandBurgerClick().subscribe((click) => {
      this.clickState = click;
      this.appOverlayService.changeOverlayState(click);
    });
  }

  ngOnInit(): void {}

  onClick = () => {
    this.clickState = !this.clickState;
    this.clickService.onClickHandBurger(this.clickState);
  };
}
