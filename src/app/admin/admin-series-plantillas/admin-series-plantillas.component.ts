import { Component } from '@angular/core';
import { IconName } from '../shared/icon/icon.component';

interface SerieStep {
  n: number;
  time: string;
  action: string;
  category: string;
  iconKey: IconName;
}

@Component({
  selector: 'app-admin-series-plantillas',
  templateUrl: './admin-series-plantillas.component.html',
  styleUrls: ['./admin-series-plantillas.component.css'],
})
export class AdminSeriesPlantillasComponent {
  activeTab: 'series' | 'plantillas' = 'series';

  serieName = 'Rutina mañana';
  serieStart = 'Lun 6:30 am';
  serieFrequency = 'L-V';

  steps: SerieStep[] = [
    { n: 1, time: '6:30 am', action: 'Despertar', category: 'Salud', iconKey: 'sun' },
    { n: 2, time: '6:35 am', action: 'Agua', category: 'Salud', iconKey: 'droplet' },
    { n: 3, time: '6:45 am', action: 'Estiramiento', category: 'Salud', iconKey: 'activity' },
  ];

  readonly iconGrid: { key: IconName; label: string }[] = [
    { key: 'sun', label: 'sun' },
    { key: 'droplet', label: 'droplet' },
    { key: 'activity', label: 'activity' },
    { key: 'pill', label: 'pill' },
    { key: 'dumbbell', label: 'dumbbell' },
    { key: 'leaf', label: 'leaf' },
    { key: 'home', label: 'home' },
    { key: 'brain', label: 'brain' },
    { key: 'trash2', label: 'trash2' },
    { key: 'star', label: 'star' },
  ];

  readonly categoryOptions = ['Salud', 'Hogar', 'Estudio'];
  readonly categoryIcons: Record<string, IconName> = {
    Salud: 'heart',
    Hogar: 'home',
    Estudio: 'bookOpen',
  };

  addStepModalOpen = false;
  newStepTime = '';
  newStepAction = '';
  newStepCategory = 'Salud';
  newStepIcon: IconName | null = null;

  saveModalOpen = false;

  templateName = 'Purificar agua';
  templateCategory = 'Salud';
  templateNote = 'Recuerda hacerlo apenas suene la alarma.';
  templateIcon: IconName = 'droplet';
  saveTemplateModalOpen = false;

  get previewTriggers(): string[] {
    return this.steps.map(
      (s) => `${this.serieStart.split(' ')[0]} ${s.time} ${s.action}`
    );
  }

  openAddStepModal(): void {
    this.newStepTime = '';
    this.newStepAction = '';
    this.newStepCategory = 'Salud';
    this.newStepIcon = null;
    this.addStepModalOpen = true;
  }

  handleAddStep(): void {
    if (!this.newStepTime.trim() || !this.newStepAction.trim() || !this.newStepIcon) return;
    this.steps = [
      ...this.steps,
      {
        n: this.steps.length + 1,
        time: this.newStepTime,
        action: this.newStepAction,
        category: this.newStepCategory,
        iconKey: this.newStepIcon,
      },
    ];
    this.addStepModalOpen = false;
  }

  handleSave(): void {
    this.saveModalOpen = true;
  }

  closeSaveModal(): void {
    this.saveModalOpen = false;
  }

  closeAddStepModal(): void {
    this.addStepModalOpen = false;
  }

  handleSaveTemplate(): void {
    if (!this.templateName.trim()) return;
    this.saveTemplateModalOpen = true;
  }

  closeSaveTemplateModal(): void {
    this.saveTemplateModalOpen = false;
  }
}
