import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from  "@angular/common/http";

class  Customer {
  id : number;
  name: string;
  email: string;
  tel: string;
  }

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteEjemComponent implements OnInit {

  customersObservable : Observable<Customer[]>;

  constructor(private  httpClient:HttpClient) { }

  ngOnInit() {
    this.customersObservable = this.httpClient.get<Customer[]>("127.0.0.1:3000/customers");
  }
  
}
