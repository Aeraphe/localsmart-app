import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  showSearch = false;
  @ViewChild('search_input') searchInputRef!: ElementRef<HTMLInputElement>;
  constructor(private serachService: SearchService) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.serachService.searchAction().subscribe((action) => {
      this.showSearch = action;
      if (action) {
        setTimeout(() => {
          this.setFocous();
        }, 200);
      }
    });
  }

  toogle = () => {
    this.serachService.toogle();
  };

  setFocous = () => {
    this.searchInputRef.nativeElement.focus();
  };
}
