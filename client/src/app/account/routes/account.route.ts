import { AuthLayoutComponent } from "../../shared/modules/layouts/components/auth-layout/auth-layout.component";
import { LoginPageComponent } from "../components/login-page/login-page.component";
import { RegisterPageComponent } from "../components/register-page/register-page.component";
import { AuthGuard } from "../../shared/guards/auth.guard";
import { Route } from "../../shared/types/interfaces";
import { AppLayoutComponent } from "../../shared/modules/layouts/components/app-layout/app-layout.component";
import { AccountSettingPageComponent } from "../components/account-setting-page/account-setting-page.component";


export function getRoutes(): Route[] {
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

        {
            path: '',
            component: AppLayoutComponent,
            canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
            children: [
                {
                    path: 'account-settings-page',
                    component: AccountSettingPageComponent,
                },
            ],
        },

    ];
}

