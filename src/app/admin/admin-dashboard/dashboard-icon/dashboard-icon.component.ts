import { Component, Input } from '@angular/core';
import { IconName } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-dashboard-icon',
  templateUrl: './dashboard-icon.component.html',
  styleUrls: ['./dashboard-icon.component.css'],
})
export class DashboardIconComponent {
  @Input() iconKey = 'droplet';
  @Input() size = 16;

  get iconName(): IconName {
    const map: Record<string, IconName> = {
      droplet: 'droplet',
      pill: 'pill',
      leaf: 'leaf',
      bookOpen: 'bookOpen',
      trash: 'trash2',
    };
    return map[this.iconKey] ?? 'droplet';
  }
}
