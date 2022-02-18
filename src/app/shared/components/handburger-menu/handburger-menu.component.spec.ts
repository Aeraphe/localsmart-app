import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandburgerMenuComponent } from './handburger-menu.component';

describe('HandburgerMenuComponent', () => {
  let component: HandburgerMenuComponent;
  let fixture: ComponentFixture<HandburgerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandburgerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandburgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
