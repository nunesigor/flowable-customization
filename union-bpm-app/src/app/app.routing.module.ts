import { NgModule, ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ChangePasswordComponent } from "./changepassword/changepassword.component";
import { ProcessComponent } from "./bpm/process/process.component";
import { ProcessInstancesComponent } from "./bpm/process/instances/processinstances.component";
import { TaskComponent } from "./bpm/task/task.component";
import { TaskDetailComponent } from "./bpm/task/detail/taskdetail.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, children : [
        // {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        // {path: 'dashboard', component: LoginComponent},
        {path: 'process', component: ProcessComponent},
        {path: 'process/:processId', component: ProcessInstancesComponent},
        {path: 'task', component: TaskComponent},
        {path: 'task/:taskId', component: TaskDetailComponent},
        {path: 'changepassword', component: ChangePasswordComponent}
    ]}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}