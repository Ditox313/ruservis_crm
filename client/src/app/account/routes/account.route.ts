import { AuthLayoutComponent } from "../../shared/modules/layouts/components/auth-layout/auth-layout.component";
import { LoginPageComponent } from "../components/login-page/login-page.component";
import { RegisterPageComponent } from "../components/register-page/register-page.component";
import { Routes } from '@angular/router';

// import { AuthLayoutComponent } from "src/app/shared/modules/layouts/components/auth-layout/auth-layout.component";
// import { Route } from "src/app/shared/types/interfaces";
// import { AppLayoutComponent } from "src/app/shared/modules/layouts/components/app-layout/app-layout.component";
// import { AuthGuard } from "../../shared/guards/auth.guard";


// export function getRoutes(): Route[] {
export function getRoutes(): Routes {
    return [
        {
            path: '',
            component: AuthLayoutComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'login-page',
                    pathMatch: 'full',
                },
                {
                    path: 'login-page',
                    component: LoginPageComponent,
                },
                {
                    path: 'register-page',
                    component: RegisterPageComponent,
                },
            ],
        },

    ];
}

