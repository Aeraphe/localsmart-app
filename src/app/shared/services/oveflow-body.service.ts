import { Injectable, Renderer2,RendererFactory2  } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OveflowBodyService {

  private render!: Renderer2;
  constructor(renderFactory:RendererFactory2 ) {
    this.render = renderFactory.createRenderer(null,null);
  }

  activeOverflowBody = () => {
    this.render.addClass(document.body, 'oveflow-body--active');
  };

  removeOverflowBody = () => {
    this.render.removeClass(document.body, 'oveflow-body--active');
  };
}
