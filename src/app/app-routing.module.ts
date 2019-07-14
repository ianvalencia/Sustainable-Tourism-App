import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OnboardingGuard } from './guards/onboarding.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'onboarding',
    loadChildren: './pages/onboarding/onboarding.module#OnboardingPageModule',
    canLoad: [OnboardingGuard]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule'
  },
  {
    path: 'favorites',
    loadChildren: './pages/favorites/favorites.module#FavoritesPageModule'
  },
  {
    path: 'booking-details/:id',
    loadChildren: './pages/booking-details/booking-details.module#BookingDetailsPageModule'
  },
  {
    path: 'activity-details/:id',
    loadChildren: './pages/activity-details/activity-details.module#ActivityDetailsPageModule'
  },
  { path: 'title',
    loadChildren: './pages/title/title.module#TitlePageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
