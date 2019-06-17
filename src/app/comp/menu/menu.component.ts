import { Component, OnInit } from '@angular/core';
import { MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  visibleSidebar1: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-pw pi-home',
          routerLink: ['/']
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'ejemplos', icon: 'pi pi-fw pi-refresh', routerLink: ['/home']},
              {label: 'Parametros', icon: 'pi pi-pi pi-list', routerLink: ['/valorParametro']}
          ]
      },
      {
          label: 'Cliente',
          icon: 'pi pi-fw pi-users',
          items: [
              {
                  label: 'Crear',
                  icon: 'pi pi-pi pi-user-plus',
                  routerLink: ['/crearCliente']
              },
              {
                  label: 'Editar', 
                  icon: 'pi pi-pi pi-pencil', 
              },
              {
                  label: 'Eliminar', 
                  icon: 'pi pi-pi pi-user-minus',
              },
              {
                  label: 'Lista', 
                  icon: 'pi pi-pi pi-list',
              },
              {
                  label: 'Ejem post', 
                  icon: 'pi pi-pi pi-list',
                  routerLink: ['/cliente']
              }
          ]
      },
      {
          label: 'Actions',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {label: 'Save', icon: 'pi pi-fw pi-save'},
                      {label: 'Update', icon: 'pi pi-fw pi-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
      }
  ];
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
}

}
