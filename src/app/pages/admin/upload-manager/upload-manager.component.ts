import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-upload-manager',
  templateUrl: './upload-manager.component.html',
  styleUrls: ['./upload-manager.component.scss']
})
export class UploadManagerComponent implements OnInit {


  files:File[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
