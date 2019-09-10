import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { FavoriteComponentComponent } from './main-view/favorite-component/favorite-component.component';

const appRoutes: Routes = [
  { path: 'home', component: MainViewComponent },
  { path: 'favorite', component: FavoriteComponentComponent },
  { path: '/',   redirectTo: '/home' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
