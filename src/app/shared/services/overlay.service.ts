import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private render!: Renderer2;
  constructor(renderFactory: RendererFactory2) {
    this.render = renderFactory.createRenderer(null, null);
  }

  changeOverlayState = (state: boolean): void => {
    if (state) {
      this.render.addClass(
        document.querySelector('#app-overlay'),
        'overlay-activate'
      );
    } else {
      this.render.removeClass(
        document.querySelector('#app-overlay'),
        'overlay-activate'
      );
    }
  };
}
