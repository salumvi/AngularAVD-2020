import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    exports: [
        BreadcrumbsComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent
    ],
    providers: [],
})
export class SharedModule {}
