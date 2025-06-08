import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() color: 'blue' | 'pink' | 'green' | 'gray' = 'blue';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() text: string = 'Botão';
  @Input() class?: string;
  @Input() ariaLabel?: string;

  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string[] {
    const baseClasses = ['btn', `btn-${this.color}`];
    return this.class ? [...baseClasses, this.class] : baseClasses;
  }
}
