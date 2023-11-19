import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { EditarComponent } from './vistas/editar/editar.component';
import { GraficosComponent } from './vistas/graficos/graficos.component';
import { ComdashboardComponent } from './vistas/comdashboard/comdashboard.component';
import { GracomunityComponent } from './vistas/gracomunity/gracomunity.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'editar', component: EditarComponent },
  { path: 'graficos', component: GraficosComponent },
  { path: 'comunity', component: ComdashboardComponent },
  { path: 'comunitygrahp', component: GracomunityComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            ToastrModule.forRoot(),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, NuevoComponent, EditarComponent]
