import { NgModule, Component } from '@angular/core';
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
  { path: 'message', loadChildren: './message/message.module#MessagePageModule' },
  { path: 'edit-profile', loadChildren: './modals/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'message/:handle', loadChildren: './message/message.module#MessagePageModule'},
  { path: ':handle', loadChildren: './pages/handle/handle.module#HandlePageModule'},
  //{ path: ':handle', component: HandlePageModule}
    // children: [
    //   { path: 'message', component:  MessagePageModule}
    // ]
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
