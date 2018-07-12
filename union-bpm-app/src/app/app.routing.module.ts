import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}