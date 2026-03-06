import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

export interface Alarm {
  id: string;
  name: string;
  iconKey: string;
  time: string;
  repeat: string;
  category: string;
  categoryKey: string;
  enabled: boolean;
}

const ALL_ALARMS: Alarm[] = [
  { id: '1', name: 'Purificar agua', iconKey: 'droplet', time: '7:30 pm', repeat: 'Diario', category: 'Salud', categoryKey: 'salud', enabled: true },
  { id: '2', name: 'Tomar medicamento', iconKey: 'pill', time: '9:00 pm', repeat: 'L-V', category: 'Salud', categoryKey: 'salud', enabled: true },
  { id: '3', name: 'Regar plantas', iconKey: 'leaf', time: '6:00 am', repeat: 'L-V', category: 'Hogar', categoryKey: 'hogar', enabled: false },
  { id: '4', name: 'Leer 20 min', iconKey: 'bookOpen', time: '8:00 pm', repeat: 'Mar/Jue', category: 'Estudio', categoryKey: 'estudio', enabled: true },
  { id: '5', name: 'Sacar basura', iconKey: 'trash', time: '7:00 pm', repeat: 'Sab', category: 'Hogar', categoryKey: 'hogar', enabled: false },
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements AfterViewChecked {
  @ViewChild('selectAllCb') selectAllCb?: ElementRef<HTMLInputElement>;

  checked: string[] = [];
  modalOpen = false;
  newTime = '8:15 pm';
  keepRepeat = true;
  isBulkMode = false;
  selectedAlarmId = '1';
  displayedAlarms: Alarm[] = [...ALL_ALARMS];
  alarmSearch = '';

  get filteredAlarms(): Alarm[] {
    const q = this.alarmSearch.trim().toLowerCase();
    return q
      ? this.displayedAlarms.filter((a) => a.name.toLowerCase().includes(q))
      : this.displayedAlarms;
  }

  get selectedAlarm(): Alarm | undefined {
    return this.displayedAlarms.find((a) => a.id === this.selectedAlarmId);
  }

  toggleChecked(id: string): void {
    const i = this.checked.indexOf(id);
    if (i >= 0) this.checked = this.checked.filter((x) => x !== id);
    else this.checked = [...this.checked, id];
  }

  toggleAllChecked(): void {
    if (this.checked.length === this.displayedAlarms.length) this.checked = [];
    else this.checked = this.displayedAlarms.map((a) => a.id);
  }

  get allChecked(): boolean {
    return this.displayedAlarms.length > 0 && this.checked.length === this.displayedAlarms.length;
  }

  get someChecked(): boolean {
    return this.checked.length > 0 && this.checked.length < this.displayedAlarms.length;
  }

  handleDelete(): void {
    this.displayedAlarms = this.displayedAlarms.filter((a) => !this.checked.includes(a.id));
    this.checked = [];
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  exitBulkMode(): void {
    this.isBulkMode = false;
    this.checked = [];
  }

  ngAfterViewChecked(): void {
    const el = this.selectAllCb?.nativeElement;
    if (el) el.indeterminate = this.someChecked;
  }
}
