import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';
import { ClienteEjemComponent } from './comp/cliente/cliente.component';
import { CrearComponent } from './comp/cliente/crear/crear.component';
import { CustomerListComponent } from './comp/customer/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './comp/customer/customer-details/customer-details.component';
import { CustomerCreateComponent } from './comp/customer/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './comp/customer/customer-update/customer-update.component';
import { ValorParametroComponent } from './mantenedores/valor-parametro/valor-parametro.component';
import { ClienteComponent } from './mantenedores/cliente/cliente.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'clienteEjem', component: ClienteEjemComponent},
  {path: 'crearCliente', component: CrearComponent},
  //{ path:  '', pathMatch:  'full', redirectTo:  'list'},
  { path: 'list', component: CustomerListComponent},
  { path: 'details/:id', component: CustomerDetailsComponent},
  { path: 'create', component: CustomerCreateComponent},
  { path: 'update', component: CustomerUpdateComponent},
  // mantenedor valor Parametro
  {path: 'valorParametro', component: ValorParametroComponent},
  {path: 'cliente', component: ClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
