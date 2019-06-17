import { Component, OnInit } from '@angular/core';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { format } from 'util';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  items: any;
  paises: any;
  val1:any;
  emisores: any;
  emisor: any;
  pais: Array<any> = [];
  division1: any;
  division2: any;
  division3: any;
  item1: any;
  item2: any;
  item3: any;

  region: String = "";
  provincia: String ="";
  comuna: String ="";

  constructor() { }

  ngOnInit() {
    this.items = [];
    for (let i = 0; i < 10000; i++) {
      this.items.push({ label: 'Dirección ' + i, value: 'Id ' + i });
    }

    this.emisores =[
      {id: 1,cid_pais: 152, codigo: "CORONA", nombre: "Contingencia CORONA", bloqueado: 0},
      {id: 2,id_pais: 152,codigo: "CORONA",nombre: "Contingencia CORONA",bloqueado: 0},
      {id: 3,id_pais: 152,codigo: "TEST",nombre: "Emisor Test",bloqueado: 0}
    ];

    this.paises =[
      {id: 152, codigo: "CL", nombre: "Chile", nombre_division1: "Región", nombre_division2: "Provincia", nombre_division3: "Comuna"}
    ];
    this.division1 =[
      {id: 1, pais: 152, nombre: "Tarapacá" }];

    this.division2 =[
      {id: 3, id_division1: 152, nombre: "Iquique" }
    ];
    this.division3 =[
      {id: 10301, id_division2: 3, nombre: "Iquique" }
    ];

  }


  mostrarConsole(){
    console.log(this.pais);
  }

  mostrarLabel(pais: any){
    this.region = pais.nombre_division1;
    this.provincia = pais.nombre_division2;
    this.comuna = pais.nombre_division3;
  }

  formatDate(){
    let format: String = new Date().toLocaleString();
    return format;
  }
}
