import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverLighlight]',
})
export class HoverLighlightDirective {
  @Input() highlightColor: string = 'yellow';
  @Input() defaultColor: string = 'transparent';

  // ElementRef: give acces to the dom element this directive is applied to.
  // Renderer2: modifies dom properties and styles like background
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor(this.defaultColor);
  }
}
