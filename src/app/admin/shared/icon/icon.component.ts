import { Component, Input } from '@angular/core';

export type IconName =
  | 'search' | 'droplet' | 'pill' | 'leaf' | 'bookOpen' | 'trash2'
  | 'heart' | 'home' | 'clock' | 'refreshCw' | 'plus' | 'checkCircle' | 'xCircle'
  | 'sun' | 'star' | 'activity' | 'dumbbell' | 'brain' | 'fileText' | 'link' | 'share2' | 'alertCircle'
  | 'filter' | 'barChart' | 'copy' | 'volume2' | 'vibrate';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent {
  @Input() name: IconName = 'search';
  @Input() size = 24;
}
