import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderNavService } from '../../shared/services/header-nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,AfterViewInit  {
  touch =  true;

  @ViewChild('photo')  divPhotoEl!: ElementRef<HTMLDivElement>;
  constructor(private headerService: HeaderNavService) {

  }

  ngOnInit(): void {
    
    this.toogleAppHeader()
  }

  ngAfterViewInit() {
    console.log(this.divPhotoEl.nativeElement.style.setProperty('--bg-path','url("../../../assets/photos/teste.jfif")'));
  }

  toogleAppHeader = () => {
    if(this.touch){
      this.headerService.open();
      this.touch = false;

      setTimeout(() => {
        this.headerService.close();
        this.touch = true;
      }, 5000);
    }
  
  };
}
