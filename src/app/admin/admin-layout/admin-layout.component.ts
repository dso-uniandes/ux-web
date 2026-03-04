import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

const SECTION_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  'series-plantillas': 'Series/Plantillas',
  categorias: 'Categorias',
  estadisticas: 'Estadisticas',
};

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  currentSection = 'Dashboard';

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.getSectionFromUrl())
      )
      .subscribe((label) => (this.currentSection = label));
    this.currentSection = this.getSectionFromUrl();
  }

  private getSectionFromUrl(): string {
    const url = this.router.url.replace(/^.*\/admin\/?/, '') || 'dashboard';
    const segment = url.split('/')[0] || 'dashboard';
    return SECTION_LABELS[segment] ?? 'Dashboard';
  }
}
