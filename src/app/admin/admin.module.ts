import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSeriesPlantillasComponent } from './admin-series-plantillas/admin-series-plantillas.component';
import { AdminCategoriasComponent } from './admin-categorias/admin-categorias.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminSeriesPlantillasComponent,
    AdminCategoriasComponent,
    AdminEstadisticasComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, RouterModule],
})
export class AdminModule {}
