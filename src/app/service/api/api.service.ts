import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmiParametroTransaccion } from 'src/app/clases/emi_parametro_transaccion/emi-parametro-transaccion';
import { tap } from 'rxjs/operators';
import { EmiTipoParametrosTransaccion } from 'src/app/clases/emi-tipo-parametros-transaccion';
import { EmiEmisor } from 'src/app/clases/emi-emisor';
import { EmiTipoMovimiento } from 'src/app/clases/emi-tipo-movimiento';
import { ComMoneda } from 'src/app/clases/com-moneda';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //apiURL: string = 'http://www.server.com/api/';
  apiURL: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  /*public createEmiParametroTransaccion(emiParametroTransaccion: EmiParametroTransaccion) { }
  public updateEmiParametroTransaccion(customer: EmiParametroTransaccion) { }
  public deleteEmiParametroTransaccion(id: number) { }
  public getEmiParametroTransaccionById(id: number) { }
  public getEmiParametroTransacciones(url?: string) {
    if (url) {
      return this.httpClient.get<EmiParametroTransaccion[]>(url, { observe: 'response' }).pipe(tap(res => {
        this.retrieve_pagination_links(res);
      }));
    }

    return this.httpClient.get<EmiParametroTransaccion[]>(`${this.apiURL}/EmiParametroTransaccion?page=1`,
      { observe: 'response' }).pipe(tap(res => {
        this.retrieve_pagination_links(res);
      }));
  } */
  
  retrieve_pagination_links(res: any) {
    throw new Error("Method not implemented.");
  }

  public firstPage: string = "";
  public prevPage: string = "";
  public nextPage: string = "";
  public lastPage: string = "";

  //ParametroTransaccion
  public getParametroTransacciones() {
    return this.httpClient.get<EmiParametroTransaccion[]>(`${this.apiURL}/emi_parametro_transaccion`);
  }
  public getParametroTransaccionById(id: number) {
    return this.httpClient.get(`${this.apiURL}/emi_parametro_transaccion/${id}`);
  }

  public createParametroTransaccion(parametroTransaccion: EmiParametroTransaccion) {
    return this.httpClient.post(`${this.apiURL}/emi_parametro_transaccion/`, parametroTransaccion);
  }
  public updateParametroTransaccion(parametroTransaccion: EmiParametroTransaccion) {
    return this.httpClient.put(`${this.apiURL}/emi_parametro_transaccion/${parametroTransaccion.id}`, parametroTransaccion);
  }
  public deleteParametroTransaccion(id: number){
    return this.httpClient.delete(`${this.apiURL}/emi_parametro_transaccion/${id}`);
}

//EmiTipoParametrosTransaccion
public getEmiTipoParametrosTransacciones(){
  return this.httpClient.get<EmiTipoParametrosTransaccion[]>(`${this.apiURL}/emi_tipo_parametros_transaccion`);
}
//EmiEmisor
public getEmiEmisores(){
  return this.httpClient.get<EmiEmisor[]>(`${this.apiURL}/emi_emisor`);
}
//EmiTipoMovimiento
public getEmiTipoMovimientos(){
  return this.httpClient.get<EmiTipoMovimiento[]>(`${this.apiURL}/emi_tipo_movimiento`);
}
//ComMoneda
public getComMonedas(){
  return this.httpClient.get<ComMoneda[]>(`${this.apiURL}/com_moneda`);
}

}//end
