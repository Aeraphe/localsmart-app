import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandburgerMenuService } from '../../../shared/services/handburger-menu.service';
import { OveflowBodyService } from '../../../shared/services/oveflow-body.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  navToogle = false;
  user: any;

  constructor(
    private handBurgerService: HandburgerMenuService,
    private overflow: OveflowBodyService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.handleClickEventOnHandBurgerBtn();
    this.handleUserLogin();
  }

  private handleClickEventOnHandBurgerBtn() {
    let clickHandBurger$ = this.handBurgerService.getHandBurgerClick();
    clickHandBurger$.subscribe((click) => {
      this.handleOverflowBody(click);
      this.navToogle = click;
    });
  }

  private handleUserLogin = () => {
    this.authService.monitorAuthState().subscribe((userState) => {
      this.user = userState;
    });
  };

  handleOverflowBody = (active: boolean) => {
    if (active) {
      this.overflow.activeOverflowBody();
    } else {
      this.overflow.removeOverflowBody();
    }
  };

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
