import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

interface PatternPosition {
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

interface RenderPosition extends PatternPosition {
  transform: string;
}

@Component({
  selector: 'app-icon-pattern-background',
  template: `
    <div [class]="rootClass">
      <svg
        viewBox="0 0 1920 900"
        preserveAspectRatio="xMidYMid slice"
        [style.opacity]="opacity"
      >
        <g *ngFor="let pos of positions; let i = index" [attr.transform]="pos.transform">
          <g
            fill="none"
            stroke="#507263"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path [attr.d]="icons[i % icons.length]"></path>
          </g>
        </g>
      </svg>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        pointer-events: none;
        z-index: 0;
      }

      .pattern-root {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }

      .pattern-root svg {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPatternBackgroundComponent {
  @HostBinding('attr.aria-hidden') readonly ariaHidden = 'true';

  @Input() className = '';

  @Input()
  set opacity(value: number) {
    const next = Number(value);
    this._opacity = Number.isFinite(next) ? Math.max(0, Math.min(1, next)) : 1;
  }

  get opacity(): number {
    return this._opacity;
  }

  private _opacity = 1;

  // Path-only icon set for a light decorative background.
  readonly icons: string[] = [
    'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
    'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
    'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z',
    'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z',
    'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z',
    'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z',
    'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z',
    'M22 11.08V12a10 10 0 1 1-5.93-9.14',
    'M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z',
  ];

  private readonly rawPositions: PatternPosition[] = this.createPositions();

  readonly positions: RenderPosition[] = this.rawPositions.map((pos) => ({
    ...pos,
    transform: `translate(${pos.x}, ${pos.y}) rotate(${pos.rotate}) scale(${pos.scale})`,
  }));

  private createPositions(): PatternPosition[] {
    const width = 1920;
    const height = 900;
    const xStep = 135;
    const yStep = 95;
    const points: PatternPosition[] = [];

    for (let y = 18, row = 0; y < height - 12; y += yStep, row += 1) {
      for (let x = 24, col = 0; x < width - 20; x += xStep, col += 1) {
        const seed = row * 31 + col * 17;
        points.push({
          x: x + (seed % 23) - 11,
          y: y + ((seed * 3) % 25) - 12,
          rotate: (seed * 11) % 90 - 45,
          scale: 0.85 + ((seed * 7) % 41) / 100,
        });
      }
    }

    return points;
  }

  get rootClass(): string {
    return `pattern-root ${this.className}`.trim();
  }
}
