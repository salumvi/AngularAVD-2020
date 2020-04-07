import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';


@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
    ],
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
    ],
    providers: [],
})
export class PagesModule { }
