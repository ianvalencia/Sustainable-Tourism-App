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
    children: [
      {
        path: '',
        loadChildren: './pages/tabs/tabs.module#TabsPageModule',
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
        path: 'new-offer',
        loadChildren: './pages/new-offer/new-offer.module#NewOfferPageModule'
      },
      {
        path: 'booking-details',
        children: [
          {
            path: ':id',
            loadChildren: './pages/booking-details/booking-details.module#BookingDetailsPageModule'
          },
          {
            path: '',
            redirectTo: '/app/tabs/bookings',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'activity-details',
        children: [
          {
            path: ':id',
            loadChildren: './pages/activity-details/activity-details.module#ActivityDetailsPageModule'
          },
          {
            path: '',
            redirectTo: '/app/tabs/discover',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'edit-offer',
        children: [
          {
            path: ':id',
            loadChildren: './pages/edit-offer/edit-offer.module#EditOfferPageModule'
          },
          {
            path: '',
            redirectTo: '/app/tabs/offers',
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
  {
    path: 'onboarding',
    loadChildren: './pages/onboarding/onboarding.module#OnboardingPageModule',
    canLoad: [OnboardingGuard]
  },
  { path: 'title',
    loadChildren: './pages/title/title.module#TitlePageModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
