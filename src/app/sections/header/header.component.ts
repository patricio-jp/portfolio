import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FaIconComponent],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  @Input() activeSection: string = '';
  openIcon = faBars;
  closeIcon = faXmark;
  menuIcon: IconDefinition = this.openIcon;

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.menuIcon = this.closeIcon;
    } else {
      this.menuIcon = this.openIcon;
    }
  }
}
