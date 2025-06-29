import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GerenciarMercadoriaComponent } from './pages/gerenciar-mercadoria/gerenciar-mercadoria.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'gerenciar-mercadoria', component: GerenciarMercadoriaComponent },
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];