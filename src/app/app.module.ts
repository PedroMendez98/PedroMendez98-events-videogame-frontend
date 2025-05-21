import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Tournaments
import { TournamentListComponent } from './models/tournaments/tournament-list/tournament-list.component';
import { MyReservationsComponent } from './models/tournaments/my-reservations/my-reservations.component';

// Shared
import { NavbarComponent } from './shared/navbar/navbar.component';

// Interceptor
import { TokenInterceptor } from './core/auth/token.interceptor';

import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';






@NgModule({
  declarations: [
    AppComponent,
    TournamentListComponent,
    MyReservationsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
