import { Component } from '@angular/core';
import { IconName } from '../shared/icon/icon.component';

interface Category {
  id: string;
  label: string;
  iconName: IconName;
}

@Component({
  selector: 'app-admin-categorias',
  templateUrl: './admin-categorias.component.html',
  styleUrls: ['./admin-categorias.component.css'],
})
export class AdminCategoriasComponent {
  sel = 'salud';
  categories: Category[] = [
    { id: 'hogar', label: 'Hogar', iconName: 'home' },
    { id: 'salud', label: 'Salud', iconName: 'heart' },
    { id: 'estudio', label: 'Estudio', iconName: 'bookOpen' },
  ];
  selectedIcon: IconName | null = null;
  newCategoryName = '';

  readonly iconGrid: { key: IconName; displayLabel: string }[] = [
    { key: 'droplet', displayLabel: 'droplet' }, { key: 'pill', displayLabel: 'pill' },
    { key: 'activity', displayLabel: 'activity' }, { key: 'dumbbell', displayLabel: 'dumbbell' },
    { key: 'leaf', displayLabel: 'leaf' }, { key: 'home', displayLabel: 'home' },
    { key: 'trash2', displayLabel: 'trash' }, { key: 'bookOpen', displayLabel: 'bookOpen' },
  ];

  get selectedCategory(): Category | undefined {
    return this.categories.find((c) => c.id === this.sel);
  }

  get selectedIconDisplayLabel(): string {
    if (!this.selectedIcon) return '';
    return this.iconGrid.find((ic) => ic.key === this.selectedIcon)?.displayLabel ?? this.selectedIcon;
  }

  setSel(id: string): void {
    this.sel = id;
  }

  handleAddCategory(): void {
    if (!this.newCategoryName.trim() || !this.selectedIcon) return;
    const id = this.newCategoryName.toLowerCase().replace(/\s+/g, '-');
    const newCat: Category = {
      id,
      label: this.newCategoryName.trim(),
      iconName: this.selectedIcon,
    };
    this.categories = [newCat, ...this.categories];
    this.newCategoryName = '';
    this.selectedIcon = null;
    this.sel = id;
  }
}
