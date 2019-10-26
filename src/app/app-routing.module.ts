import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'addskill', loadChildren: './modals/addskill/addskill.module#AddskillPageModule' },
  { path: ':handle', loadChildren: './pages/handle/handle.module#HandlePageModule' }
];

@NgModule({
  imports: [
    //RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
