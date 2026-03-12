import { Injectable } from '@angular/core';

// Declaramos la función gtag de forma global para que TypeScript no arroje errores
declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  // Método para registrar secciones como si fueran páginas distintas
  public logVirtualPageView(path: string, title: string): void {
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
        page_location: window.location.origin + path,
      });
    }
  }

  // Método para registrar interacciones específicas (ej. abrir un modal sin considerarlo una vista de página)
  public logCustomEvent(eventName: string, params: Record<string, any> = {}): void {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }
}
