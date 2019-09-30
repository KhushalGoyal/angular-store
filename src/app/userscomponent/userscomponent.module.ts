import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserscomponentRoutingModule } from './userscomponent-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer, UserEffects, UsersService } from '../core';
import { UserscomponentComponent } from './userscomponent.component';

import { SharedModule } from '../core/shared.module';


@NgModule({
  declarations: [
    UserscomponentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserscomponentRoutingModule,
    StoreModule.forFeature('users', usersReducer),
		EffectsModule.forFeature([UserEffects]),
  ],
  providers:[
    UsersService
  ]
})

export class UserscomponentModule { }
