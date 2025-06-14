import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextTransform]',
})
export class TextTransformDirective {
  @Input() transformType: 'uppercase' | 'lowercase' = 'uppercase';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private setTextTransform(text: string) {
    if (this.transformType === 'uppercase') {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        text.toUpperCase()
      );
    } else {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerText',
        text.toLowerCase()
      );
    }
  }

  ngOnInit() {
    const text = this.el.nativeElement.innerText;
    this.setTextTransform(text);
  }
}
