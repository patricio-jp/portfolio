import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ResumeComponent } from './sections/resume/resume.component';
import { ContactComponent } from './sections/contact/contact.component';
import { HeaderComponent } from './sections/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SkillsComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'patriciojp-portfolio';

  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToSection();
      });
  }

  ngOnInit(): void {
    // Auto dark-mode
    document.documentElement.classList.toggle(
      'dark',
      localStorage['theme'] === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }

  scrollToSection(): void {
    const currentRoute = this.router.url;

    let compSelector = '';

    switch (currentRoute) {
      case '/skills': {
        compSelector = 'app-skills';
        break;
      }
      case '/projects': {
        compSelector = 'app-projects';
        break;
      }
      case '/resume': {
        compSelector = 'app-resume';
        break;
      }
      case '/contact': {
        compSelector = 'app-contact';
        break;
      }
      default: {
        compSelector = 'app-root';
        break;
      }
    }

    const element = document.querySelector(compSelector);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
