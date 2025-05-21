import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentListComponent } from './models/tournaments/tournament-list/tournament-list.component';
import { MyReservationsComponent } from './models/tournaments/my-reservations/my-reservations.component';
import { adminGuard } from './core/auth/admin.guard';
import { authGuard } from './core/auth/auth.guard';
import { AuthComponent } from './models/auth/auth/auth.component';
import { AdminEventListComponent } from './admin/admin-event-list/admin-event-list.component';
import { EventCreateComponent } from './admin/event-create/event-create.component';


const routes: Routes = [
  { path: '', redirectTo: 'tournaments', pathMatch: 'full' },
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'my-reservations', component: MyReservationsComponent, canActivate: [authGuard] },
  { path: 'auth', loadChildren: () => import('./models/auth/auth.module').then(m => m.AuthModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'admin/events', component: AdminEventListComponent, canActivate: [authGuard, adminGuard]},
  { path: 'admin/events/create', component: EventCreateComponent, canActivate: [authGuard, adminGuard]},
  { path: '**', redirectTo: 'tournaments' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // ✅ ¡Esto era lo que faltaba!
  exports: [RouterModule]
})
export class AppRoutingModule { }
