import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { OnboardingGuard } from "./guards/onboarding.guard";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "onboarding",
    pathMatch: "full"
  },
  {
    path: "app",
    children: [
      {
        path: "",
        loadChildren: "./pages/tabs/tabs.module#TabsPageModule",
        canLoad: [AuthGuard]
      },
      {
        path: "profile",
        loadChildren: "./pages/profile/profile.module#ProfilePageModule",
        canLoad: [AuthGuard]
      },
      {
        path: "favorites",
        loadChildren: "./pages/favorites/favorites.module#FavoritesPageModule",
        canLoad: [AuthGuard]
      },
      {
        path: "new-offer",
        loadChildren: "./pages/new-offer/new-offer.module#NewOfferPageModule",
        canLoad: [AuthGuard]
      },
      {
        path: "booking-details",
        children: [
          {
            path: ":id",
            loadChildren:
              "./pages/booking-details/booking-details.module#BookingDetailsPageModule",
            canLoad: [AuthGuard]
          },
          {
            path: "",
            redirectTo: "/app/tabs/bookings",
            pathMatch: "full"
          }
        ]
      },
      {
        path: "activity-details",
        children: [
          {
            path: ":id",
            loadChildren:
              "./pages/activity-details/activity-details.module#ActivityDetailsPageModule",
            canLoad: [AuthGuard]
          },
          {
            path: "",
            redirectTo: "/app/tabs/discover",
            pathMatch: "full"
          }
        ]
      },
      {
        path: "edit-offer",
        children: [
          {
            path: ":id",
            loadChildren:
              "./pages/edit-offer/edit-offer.module#EditOfferPageModule",
            canLoad: [AuthGuard]
          },
          {
            path: "",
            redirectTo: "/app/tabs/offers",
            pathMatch: "full"
          }
        ]
      },
      {
        path: "about-page",
        loadChildren:
          "./pages/about-page/about-page.module#AboutPagePageModule",
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: "onboarding",
    loadChildren: "./pages/onboarding/onboarding.module#OnboardingPageModule"
  },
  {
    path: "title",
    loadChildren: "./pages/title/title.module#TitlePageModule"
  },
  {
    path: "login",
    loadChildren: "./pages/login/login.module#LoginPageModule"
  },
  {
    path: "register",
    loadChildren: "./pages/register/register.module#RegisterPageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
