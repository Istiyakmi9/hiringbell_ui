import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // {
  //   matcher: (url) => {
  //     if(url[0].path.split(/\/(.*)/s)[0] == 'admin') {
  //       return {
  //         consumed: url
  //       };
  //     }
  //     return null;
  //   },
  //   path: '',
  //   component: LayoutComponent,
  //   loadChildren: () => import('../admin/admin.module')
  //   .then(m => m.AdminModule)
  // },
  {
    matcher: (url) => {
      if(url[0].path.split(/\/(.*)/s)[0] == 'user') {
        return {
          consumed: url
        };
      }
      return null;
    },
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('../user/user.module')
    .then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
