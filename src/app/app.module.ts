import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//router y http
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//Services
import { ApiService } from './service/api/api.service';

//componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './comp/home/home.component';
import { MenuComponent } from './comp/menu/menu.component';
import { ClienteEjemComponent } from './comp/cliente/cliente.component';
import { CrearComponent } from './comp/cliente/crear/crear.component';
import { FooterComponent } from './comp/footer/footer.component';
import { ClienteComponent } from './mantenedores/cliente/cliente.component';
//componentes examples
import { CustomerListComponent } from './comp/customer/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './comp/customer/customer-details/customer-details.component';
import { CustomerCreateComponent } from './comp/customer/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './comp/customer/customer-update/customer-update.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
//componente valor parametro
import { ValorParametroComponent } from './mantenedores/valor-parametro/valor-parametro.component';

//elements PrimeNG
//import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CaptchaModule} from 'primeng/captcha';
import {PanelMenuModule} from 'primeng/panelmenu';
import {SlideMenuModule} from 'primeng/slidemenu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MessageService, ConfirmationService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ContextMenuModule} from 'primeng/contextmenu';
import { MenuTopComponent } from './comp/menu-top/menu-top.component';
import {MenubarModule} from 'primeng/menubar';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {FieldsetModule} from 'primeng/fieldset';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    MenuTopComponent,
    ClienteEjemComponent,
    CrearComponent,
    FooterComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    CustomerCreateComponent,
    CustomerUpdateComponent,
    ValorParametroComponent,
    ClienteComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    ChipsModule,
    InputMaskModule,
    InputTextModule,
    BreadcrumbModule,
    CaptchaModule,
    PanelMenuModule,
    SlideMenuModule,
    TieredMenuModule,
    ToastModule,
    DialogModule,
    TooltipModule,
    SidebarModule,
    ProgressSpinnerModule,
    ContextMenuModule,
    MenubarModule,
    KeyFilterModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    MultiSelectModule,
    ConfirmDialogModule,
    SliderModule,
    SpinnerModule,
    FullCalendarModule,
    FieldsetModule,
    CardModule,
    TabViewModule,
    TableModule
    
  ],
  providers: [MessageService, ConfirmationService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
