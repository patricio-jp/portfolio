import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { GlassCardComponent } from '@/shared/components/glass-card/glass-card.component';

@Component({
    selector: 'app-header',
    imports: [RouterLink, ZardIconComponent, GlassCardComponent],
    templateUrl: './header.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
      trigger('menuAnimation', [
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(-16px)'
          }),
          animate('300ms ease-out', style({
            opacity: 1,
            transform: 'translateY(0)'
          }))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({
            opacity: 0,
            transform: 'translateY(-16px)'
          }))
        ])
      ])
    ],
    host: {}
})
export class HeaderComponent {
  readonly activeSection = input('');

  protected readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((state) => !state);
  }
}
