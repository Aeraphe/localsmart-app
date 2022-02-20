import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandburgerMenuService } from '../../../shared/services/handburger-menu.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  navToogle = false;

  constructor(
    private handBurgerService: HandburgerMenuService,
    private router: Router
  ) {
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

  onClick = (route: string) => {
    this.handBurgerService.onClickHandBurger(false);
    this.router.navigate([route]);
    
  };
}
