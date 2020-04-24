import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login-register/login.component';



// Componentes
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { AppRoutingModule } from './app.routes';
import { RegisterComponent } from './login-register/register.component';
// Modulos presonalizados
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
