import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "../../../../environments/environment.prod";

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}
  icon = 'fa-brands fa-whatsapp';

  ngOnInit(): void {
    this.changeIcon();
  }

  encodeURI = () => {
    let baseURI = 'whatsapp://send?phone=553798268423&text=';
    let route = environment.baseUrl + ' %0a %0a';
    let info = '*Ola!!* _Gostaria de informações sobre;_ %0a %0a';

    let uri = baseURI + route;

    let saftURI: any = this.sanitizer.bypassSecurityTrustUrl(uri);
    saftURI.changingThisBreaksApplicationSecurity = uri + info;
    return saftURI;
  };

  private changeIcon = () => {
    let toogle = true;
    setInterval(() => {
      if (toogle) {
        this.icon = 'fa-solid fa-headset small';
      } else {
        this.icon = 'fa-brands fa-whatsapp';
      }
      toogle = !toogle;
    }, 5500);
  };
}
