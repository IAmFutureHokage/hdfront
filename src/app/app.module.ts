import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts";
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { OpenedDirective } from './menu/opened.directive';
import { UsersComponent } from './users/users.component';
import { CreateComponent } from './users/create/create.component';
import { EditComponent } from './users/edit/edit.component';
import { UserComponent } from './users/user/user.component';
import { RequestsComponent } from './requests/requests.component';
import { RequestComponent } from './requests/request/request.component';
import { RequestviewComponent } from './requests/requestview/requestview.component';
import { NewComponent } from './requests/new/new.component';
import { EditreqComponent } from './requests/editreq/editreq.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { UsersService } from './services/users.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ExecutorGuard } from './guards/executor.guard';
import { StatusInterceptor } from './interceptors/status.interceptor';
import { FieldsComponent } from './fields/fields.component';
import { FieldComponent } from './fields/field/field.component';
import { StatsComponent } from './stats/stats.component';

const routes = [
  {
    path: 'fields',
    canActivate: [AuthGuard, AdminGuard],
    data: { title: 'Дополнительные поля' },
    component: FieldsComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuard, AdminGuard],
    data: { title: 'Все пользователи' },
    component: UsersComponent,
  },
  {
    path: 'users/new',
    canActivate: [AuthGuard, AdminGuard],
    data: { title: 'Зарегистрировать пользователя' },
    component: CreateComponent,
  },
  {
    path: 'users/edit/:id',
    canActivate: [AuthGuard, AdminGuard],
    data: { title: 'Редактировать пользователя' },
    component: EditComponent,
  },
  {
    path: 'requests',
    canActivate: [AuthGuard, ExecutorGuard],
    data: { title: 'Все заявки' },
    component: RequestsComponent,
  },
  {
    path: 'stats',
    canActivate: [AuthGuard, ExecutorGuard],
    data: { title: 'Статистика' },
    component: StatsComponent,
  },
  {
    path: 'requests/get/:id',
    canActivate: [AuthGuard, ExecutorGuard],
    data: { title: 'Просмотр заявки' },
    component: RequestviewComponent,
  },
  {
    path: 'requests/new',
    canActivate: [AuthGuard, ExecutorGuard],
    data: { title: 'Создать заявку' },
    component: NewComponent,
  },
  {
    path: 'requests/edit/:id',
    canActivate: [AuthGuard, ExecutorGuard],
    data: { title: 'Редактировать' },
    component: EditreqComponent,
  },
  {
    path: 'requests/my',
    canActivate: [AuthGuard, ExecutorGuard],
    data: { title: 'Мои заявки' },
    component: RequestsComponent,
  },
  {
    path: 'requests/free',
    canActivate: [AuthGuard, ExecutorGuard],
    data: { title: 'Свободные заявки' },
    component: RequestsComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OpenedDirective,
    UsersComponent,
    CreateComponent,
    EditComponent,
    UserComponent,
    RequestsComponent,
    RequestComponent,
    RequestviewComponent,
    NewComponent,
    EditreqComponent,
    LoginComponent,
    FieldsComponent,
    FieldComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgApexchartsModule,
  ],
  providers: [
    AdminGuard,
    ExecutorGuard,
    AuthGuard,
    UsersService,
    AuthService,
    HttpService,
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StatusInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
