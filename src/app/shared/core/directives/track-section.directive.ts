import { Directive, ElementRef, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics.service';

@Directive({
  selector: '[appTrackSection]',
  standalone: true,
})
export class TrackSectionDirective implements OnInit, OnDestroy {
  // Recibimos el nombre de la ruta virtual y el título
  @Input('appTrackSection') sectionPath!: string;
  @Input() sectionTitle!: string;

  private el = inject(ElementRef);
  private analyticsService = inject(AnalyticsService);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    // Configuramos el observador para que se dispare cuando la sección ocupe al menos el 50% de la pantalla
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // El usuario hizo scroll hasta esta sección
            this.analyticsService.logVirtualPageView(`/${this.sectionPath}`, this.sectionTitle);
          }
        });
      },
      { threshold: 0.5 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
