import { Component } from '@angular/core';
import { IconName } from '../shared/icon/icon.component';

interface TrendDay {
  day: string;
  count: number;
  accent: boolean;
}

interface BreakdownRow {
  name: string;
  iconKey: IconName;
  total: number;
  hecho: number;
  posponer: number;
  ignorada: number;
}

@Component({
  selector: 'app-admin-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrls: ['./admin-estadisticas.component.css'],
})
export class AdminEstadisticasComponent {
  chartType: 'bar' | 'line' = 'bar';

  exportFormat: 'pdf' | 'csv' | 'link' = 'pdf';
  reportTitle = 'Semana Salud';
  recipients = 'equipo@ejemplo.com';
  permission: 'readonly' | 'edit' = 'readonly';

  showToast = false;
  showErrorToast = false;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;
  private errorToastTimer: ReturnType<typeof setTimeout> | null = null;

  trendData: TrendDay[] = [
    { day: 'Lun', count: 3, accent: false },
    { day: 'Mar', count: 2, accent: true },
    { day: 'Mie', count: 4, accent: false },
    { day: 'Jue', count: 1, accent: true },
    { day: 'Vie', count: 3, accent: false },
    { day: 'Sab', count: 3, accent: false },
    { day: 'Dom', count: 2, accent: true },
  ];

  breakdownData: BreakdownRow[] = [
    { name: 'Purificar agua', iconKey: 'droplet', total: 12, hecho: 10, posponer: 2, ignorada: 0 },
    { name: 'Tomar medicamento', iconKey: 'pill', total: 8, hecho: 7, posponer: 1, ignorada: 0 },
    { name: 'Regar plantas', iconKey: 'leaf', total: 5, hecho: 1, posponer: 3, ignorada: 1 },
  ];

  get maxCount(): number {
    return Math.max(...this.trendData.map((d) => d.count));
  }

  get yAxisLabels(): number[] {
    const labels: number[] = [];
    for (let i = this.maxCount; i >= 0; i--) {
      labels.push(i);
    }
    return labels;
  }

  barHeight(count: number): number {
    return this.maxCount ? (count / this.maxCount) * 100 : 0;
  }

  get linePath(): string {
    const pts = this.linePoints;
    const n = pts.length;
    if (n < 2) return '';

    const dx: number[] = [];
    const delta: number[] = [];
    for (let i = 0; i < n - 1; i++) {
      dx.push(pts[i + 1].x - pts[i].x);
      delta.push((pts[i + 1].y - pts[i].y) / dx[i]);
    }

    const m: number[] = new Array(n);
    m[0] = delta[0];
    m[n - 1] = delta[n - 2];
    for (let i = 1; i < n - 1; i++) {
      if (delta[i - 1] * delta[i] <= 0) {
        m[i] = 0;
      } else {
        m[i] = (delta[i - 1] + delta[i]) / 2;
      }
    }

    for (let i = 0; i < n - 1; i++) {
      if (Math.abs(delta[i]) < 1e-12) {
        m[i] = 0;
        m[i + 1] = 0;
      } else {
        const a = m[i] / delta[i];
        const b = m[i + 1] / delta[i];
        const s = a * a + b * b;
        if (s > 9) {
          const t = 3 / Math.sqrt(s);
          m[i] = t * a * delta[i];
          m[i + 1] = t * b * delta[i];
        }
      }
    }

    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < n - 1; i++) {
      const h = dx[i] / 3;
      d += ` C${pts[i].x + h},${pts[i].y + m[i] * h} ${pts[i + 1].x - h},${pts[i + 1].y - m[i + 1] * h} ${pts[i + 1].x},${pts[i + 1].y}`;
    }
    return d;
  }

  get linePoints(): { x: number; y: number }[] {
    const w = 100 / (this.trendData.length - 1);
    return this.trendData.map((d, i) => ({
      x: i * w,
      y: 100 - this.barHeight(d.count),
    }));
  }

  toggleChartType(): void {
    this.chartType = this.chartType === 'bar' ? 'line' : 'bar';
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  onShare(): void {
    if (!this.isValidEmail(this.recipients)) {
      this.showErrorToast = true;
      if (this.errorToastTimer) clearTimeout(this.errorToastTimer);
      this.errorToastTimer = setTimeout(() => (this.showErrorToast = false), 3000);
      return;
    }
    this.showToast = true;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.showToast = false), 3000);
  }
}
