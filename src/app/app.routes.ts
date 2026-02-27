import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home';
import { PostsListComponent } from './shared/posts-list/posts-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardHomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  // generic posts route reads source from URL
  { path: 'posts/:source', component: PostsListComponent, canActivate: [AuthGuard] },
  // keep old aliases for convenience
  { path: 'thrive', redirectTo: 'posts/thrive', pathMatch: 'full' },
  { path: 'mia', redirectTo: 'posts/mia', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
