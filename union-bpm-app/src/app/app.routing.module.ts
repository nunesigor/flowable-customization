import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ChangePasswordComponent } from "./changepassword/changepassword.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, children : [
        // {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        // {path: 'dashboard', component: LoginComponent},
        // {path: 'process', component: LoginComponent},
        // {path: 'task', component: LoginComponent},
        {path: 'changepassword', component: ChangePasswordComponent}
    ]}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}