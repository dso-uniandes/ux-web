import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSeriesPlantillasComponent } from './admin-series-plantillas/admin-series-plantillas.component';
import { AdminCategoriasComponent } from './admin-categorias/admin-categorias.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';
import { DashboardIconComponent } from './admin-dashboard/dashboard-icon/dashboard-icon.component';
import { IconComponent } from './shared/icon/icon.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminSeriesPlantillasComponent,
    AdminCategoriasComponent,
    AdminEstadisticasComponent,
    DashboardIconComponent,
    IconComponent,
  ],
  imports: [CommonModule, FormsModule, AdminRoutingModule, RouterModule],
})
export class AdminModule {}
