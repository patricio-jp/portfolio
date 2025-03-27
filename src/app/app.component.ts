import { Component, inject, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ResumeComponent } from './sections/resume/resume.component';
import { ContactComponent } from './sections/contact/contact.component';
import { HeaderComponent } from './sections/header/header.component';
import { register } from 'swiper/element-bundle';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

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
  private location = inject(Location);
  private isNavigating = false;
  activeSection = ''; // 👉 Guarda la sección activa para actualizar el header

  sections = [
    { id: '', selector: 'main' },
    { id: 'skills', selector: 'app-skills' },
    { id: 'projects', selector: 'app-projects' },
    { id: 'resume', selector: 'app-resume' },
    { id: 'contact', selector: 'app-contact' },
  ];

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isNavigating = true;
        this.scrollToSection();
        setTimeout(() => (this.isNavigating = false), 500);
      });

    register();
  }

  ngOnInit(): void {
    document.documentElement.classList.toggle(
      'dark',
      localStorage['theme'] === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }

  goToSection(sectionId: string) {
    this.isNavigating = true;
    this.activeSection = sectionId; // 👉 Actualiza la sección activa en el header
    this.router
      .navigateByUrl(`/${sectionId}`, { replaceUrl: true })
      .then(() => {
        this.scrollToSection();
        setTimeout(() => (this.isNavigating = false), 500);
      });
  }

  scrollToSection(): void {
    const currentRoute = this.router.url.replace('/', '');
    const section = this.sections.find((s) => s.id === currentRoute);

    if (section) {
      const element = document.querySelector(section.selector);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - 50,
          behavior: 'smooth',
        });
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isNavigating) return;

    const scrollPosition = window.scrollY + 100;

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const element = document.querySelector(this.sections[i].selector);
      if (element) {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= elementTop) {
          const newSection = this.sections[i].id;
          if (this.activeSection !== newSection) {
            this.activeSection = newSection; // 👉 Actualiza la sección activa en el header
            this.location.replaceState(`/${newSection}`);
          }
          break;
        }
      }
    }
  }
}
