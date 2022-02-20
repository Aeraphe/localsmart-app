import { Component, OnInit } from '@angular/core';
import { HandburgerMenuService } from '../../../shared/services/handburger-menu.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  navToogle = false;

  constructor(private handBurgerService: HandburgerMenuService) {
    let clickHandBurger$ = this.handBurgerService.getHandBurgerClick();
    clickHandBurger$.subscribe((click) => {
      console.log(click);
      this.navToogle = click;
    });
  }

  ngOnInit(): void {}

  closeNav = () => {
    this.navToogle = false;
    this.handBurgerService.onClickHandBurger(false);
  };
}
