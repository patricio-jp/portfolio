import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { GlassCardComponent } from '@/shared/components/glass-card/glass-card.component';

@Component({
    selector: 'app-header',
    imports: [RouterLink, ZardIconComponent, GlassCardComponent],
    templateUrl: './header.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {}
})
export class HeaderComponent {
  readonly activeSection = input('');

  protected readonly isMenuOpen = signal(false);

  protected readonly menuIcon = computed(() => (this.isMenuOpen() ? 'x' : 'menu'));

  toggleMenu(): void {
    this.isMenuOpen.update((state) => !state);
  }
}
