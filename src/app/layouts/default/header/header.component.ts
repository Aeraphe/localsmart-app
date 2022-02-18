import { Component, OnInit } from '@angular/core';
import { HeaderNavService } from '../../../shared/services/header-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerState: Boolean = false;
  constructor(private headerService: HeaderNavService) {}

  ngOnInit(): void {
    this.headerService.getHeaderState().subscribe((state) => {
      this.headerState = state;
    });
  }

  toggle = ()=>{
    this.headerState = !this.headerState
  }
}
