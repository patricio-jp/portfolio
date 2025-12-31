import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from './sections/header/header.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ResumeComponent } from './sections/resume/resume.component';
import { ContactComponent } from './sections/contact/contact.component';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SkillsComponent, ProjectsComponent, ResumeComponent, ContactComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()'
  }
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly title = signal('portfolio');
  protected readonly activeSection = signal('');
  private readonly isNavigating = signal(false);

  private readonly sections = [
    { id: '', selector: 'main' },
    { id: 'skills', selector: 'app-skills' },
    { id: 'projects', selector: 'app-projects' },
    { id: 'resume', selector: 'app-resume' },
    { id: 'contact', selector: 'app-contact' },
  ] as const;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.isNavigating.set(true);
        this.scrollToSection();
        setTimeout(() => this.isNavigating.set(false), 500);
      });
  }

  ngOnInit(): void {
    const prefersDark =
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', prefersDark);
  }

  goToSection(sectionId: string): void {
    this.isNavigating.set(true);
    this.activeSection.set(sectionId);
    this.router.navigateByUrl(`/${sectionId}`, { replaceUrl: true }).then(() => {
      this.scrollToSection();
      setTimeout(() => this.isNavigating.set(false), 500);
    });
  }

  scrollToSection(): void {
    const currentRoute = this.router.url.replace('/', '');
    const section = this.sections.find((item) => item.id === currentRoute);

    if (section) {
      const element = document.querySelector(section.selector);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - 50,
          behavior: 'smooth',
        });
      }
    }
  }

  onWindowScroll(): void {
    if (this.isNavigating()) {
      return;
    }

    const scrollPosition = window.scrollY + 100;

    for (let index = this.sections.length - 1; index >= 0; index -= 1) {
      const element = document.querySelector(this.sections[index].selector);
      if (element) {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= elementTop) {
          const newSection = this.sections[index].id;
          if (this.activeSection() !== newSection) {
            this.activeSection.set(newSection);
            this.location.replaceState(`/${newSection}`);
          }
          break;
        }
      }
    }
  }
}
