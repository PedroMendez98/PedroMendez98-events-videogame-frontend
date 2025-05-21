// src/app/admin/admin.module.ts
import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule }  from '@angular/forms';

import { AdminEventListComponent } from './admin-event-list/admin-event-list.component';
import { EventCreateComponent }    from './event-create/event-create.component';
import { authGuard }               from '../core/auth/auth.guard';
import { adminGuard }              from '../core/auth/admin.guard';

const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [ authGuard, adminGuard ],
    children: [
      { path: '',            redirectTo: 'events', pathMatch: 'full' },
      { path: 'events',      component: AdminEventListComponent },
      { path: 'events/create', component: EventCreateComponent },
      { path: 'events/:id/edit', component: EventCreateComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AdminEventListComponent,
    EventCreateComponent
  ],
  imports: [
    CommonModule,              // <<== aquí está el DatePipe, NgIf, NgFor, etc.
    ReactiveFormsModule,       // para los formularios de creación/edición
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule {}
