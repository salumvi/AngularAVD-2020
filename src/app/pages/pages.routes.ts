import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard', descripcion: 'Es el dashboar'}},
            {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas', descripcion: 'Y las gráficas'}},
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress', descripcion: 'Como se cargan las páginas'}},
            // tslint:disable-next-line:max-line-length
            {path: 'account-settings', component: AcountSettingsComponent, data: {titulo: 'AccountSetings', descripcion: 'Y aquí cambiamos el color'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas', descripcion: 'Aquí las Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs', descripcion: 'Rxjs'}},
            {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil', descripcion: 'perfil de usuario'}},

            // Mantenimiento
            {path: 'usuarios',
             component: UsuariosComponent,
             data: {titulo: 'Usuario Mantenimiento', descripcion: 'Mantinimiento de usuarios'}},
            {path: '', redirectTo: '/login', pathMatch: 'full' }


        ],

     },
    { path: '**', component: NopagefoundComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
