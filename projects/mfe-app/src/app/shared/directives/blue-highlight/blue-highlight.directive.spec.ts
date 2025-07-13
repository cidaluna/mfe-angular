import { ElementRef } from '@angular/core';
import { BlueHighlightDirective } from './blue-highlight.directive';

describe('BlueHighlightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    const mockRenderer2 = jasmine.createSpyObj('Renderer2', ['setStyle', 'removeStyle', 'addClass', 'removeClass']);
    const directive = new BlueHighlightDirective(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});
