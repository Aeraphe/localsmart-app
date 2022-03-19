import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HandburgerMenuService } from '../../../shared/services/handburger-menu.service';
import { OveflowBodyService } from '../../../shared/services/oveflow-body.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  navToogle = false;
  user: any;

  productsMenuBtn: any[] = [];

  constructor(
    private handBurgerService: HandburgerMenuService,
    private overflow: OveflowBodyService,
    private router: Router,
    private authService: AuthenticationService,
    private productService: ProductsService
  ) {
    this.handleClickEventOnHandBurgerBtn();
    this.handleUserLogin();
  }

  async ngOnInit(): Promise<void> {
    let productCategories: any = await this.productService.getProductCategory();
    this.productService.getProducts().subscribe((products) => {
      this.productsMenuBtn =  this.getMenuBtn(productCategories, products);
    });
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

  closeNav = () => {
    this.navToogle = false;
    this.handBurgerService.onClickHandBurger(false);
  };

  onClick = (route: string) => {
    this.handBurgerService.onClickHandBurger(false);
    this.router.navigate([route]);
  };

  private getMenuBtn = (productCategories: Product[], products: Product[]) => {
    let btnProducts = productCategories.filter((category: any) => {
      let count = 0;
      let findCategory = false;
      while (count < products.length && !findCategory) {
        let product = products[count];

        if (product.category == category.name) {
          findCategory = true;
        }
        count++;
      }

      return findCategory;
    });
    return btnProducts;
  };
}
