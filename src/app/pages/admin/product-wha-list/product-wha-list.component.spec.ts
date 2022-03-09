import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWhaListComponent } from './product-wha-list.component';

describe('ProductWhaListComponent', () => {
  let component: ProductWhaListComponent;
  let fixture: ComponentFixture<ProductWhaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWhaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWhaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
