import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSeriesPlantillasComponent } from './admin-series-plantillas/admin-series-plantillas.component';
import { AdminCategoriasComponent } from './admin-categorias/admin-categorias.component';
import { AdminEstadisticasComponent } from './admin-estadisticas/admin-estadisticas.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'series-plantillas', component: AdminSeriesPlantillasComponent },
      { path: 'categorias', component: AdminCategoriasComponent },
      { path: 'estadisticas', component: AdminEstadisticasComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
