import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesModule } from './features/features.module';

// To handle feature implementation
// Home Page
// Features
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'features',
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./features/features.module').then((x) => x.FeaturesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FeaturesModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
