import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBlueHighlight]',
  standalone: true
})
export class BlueHighlightDirective implements OnInit {

  constructor(private readonly elemRef: ElementRef,
              private readonly renderer: Renderer2
  ) { }

  ngOnInit() {
    // Pega o valor da variável de cor definida no styles.scss do host-app (tem q ser da aplicação principal)
    const root = this.elemRef.nativeElement.ownerDocument.documentElement;
    const useColor = getComputedStyle(root).getPropertyValue('--host-blue-highlight').trim();

    // Aplica a cor
    this.renderer.setStyle(this.elemRef.nativeElement, 'color', useColor);
  }
}
