import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ConfirmationService, Message, MessageService, SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateComponent } from '@fullcalendar/core';
import { ApiService } from 'src/app/service/api/api.service';
//import Moment from './../../loaders/momentLoader';

//api
//import {ApiService } from '/service/api';

@Component({
  selector: 'app-valor-parametro',
  templateUrl: './valor-parametro.component.html',
  styleUrls: ['./valor-parametro.component.css'],
  providers: [MessageService]
})
export class ValorParametroComponent implements OnInit {
  //busqueda.
  paramBusqueda: Array<any> = [];
  tipo: any = null;
  min: any = null;
  max: any = null;

  cal2: any;
  display: boolean;
  [x: string]: any;

  param: any;
  disabledInput: boolean;
  //FullCalendar
  events: any[];
  options: any;
  optionsx: any;

  controlTipoDato: any;
  emi_parametro_transaccion: { id: number; id_emisor: number; tipo_movimiento: number; codigo_moneda: String; tipo: number; valido_desde: String; valor_min: number; valor_max: number; }[];
  tipoMovimientoSaldo: Array<any> = [];
  disabledButton: boolean = false;
  selectedOption: any;
  //---
  selectOption: any;
  optionSelect: any;
  numero: any = "num";
  //validat
  myGroup: FormGroup;
  submitted: boolean = false;
  genders: SelectItem[];
  description: string;

  //const

  //date 
  minDate: Date;
  maxDate: Date;

  //emisores: any;
  tipoMovimientos: any;
  monedas: any;
  emisores: Array<any> = [];
  item: string;
  tipo_parametros: Array<any> = [];
  ngModelParametros: Array<any> = [];
  rangeValues: number[] = [0, 300];
  fecha: boolean = false;

  fechaPCalendar = []; //'2019-06-10', '2019-06-11', '2019-06-12', '2019-06-13'

  es: any;
  tipo_dato: number = 1;
  str = "/^[0-9]+(\.[0-9]{1,2})?$/";
  ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/; //prueba
  regexMax1: RegExp = /^[0-9]+(\.[0-9]{1,2})?$/;
  regexMax2: RegExp = /^[0-9]+(\.[0-9]{1,2})?$/;
  myDates: any;
  invalidDates: Array<Date> = new Array<Date>();

  //regexMax3: RegExp = /^[0-9]+(\.[0-9]{1,3})?$/;

  changeRegex(tipo_dato) {
    //let tipo_dato: number = 1;
    let str: string = "^[0-9]+(\.[0-9])?$";
    if ((tipo_dato !== null && tipo_dato && tipo_dato == 4) || (tipo_dato !== null && tipo_dato && tipo_dato == 14)) {
      str = "^[0-9]+(\.[0-9])?$";
    } else if ((tipo_dato && tipo_dato !== null && tipo_dato == 3) || (tipo_dato && tipo_dato !== null && tipo_dato == 13)) {
      str = "^[0-9]+(\.[0-9]{1,4})?$"; //^[^]+$
    }
    let regexChange = new RegExp(str);
    return regexChange;
  }

  mostrarFecha() {
    this.fecha = true;
  }

  //selectOption: Array<any> = [];


  cc: string;
  //ngModel
  selectEmisor: any;
  selectMovimiento: any;
  selectMoneda: any;
  msgs: Message[] = [];

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private formBuilder: FormBuilder, private fb: FormBuilder, private messageService: MessageService, ) { }

  ngOnInit() {

    //FullCalendar
    //this.eventService.getEvents().then(events => { this.events = events; });
    this.events = [
    ];

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2019-06-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: true
    };



    this.emisores = [
      { id: 1, id_pais: 152, codigo: "CORONA", nombre: "Contingencia CORONA", bloqueado: 0 },
      { id: 2, id_pais: 152, codigo: "CORONA", nombre: "Contingencia CORONA", bloqueado: 0 },
      { id: 3, id_pais: 152, codigo: "TEST", nombre: "Emisor Test", bloqueado: 0 }
    ];

    this.tipoMovimientos = [
      { id: 1, glosa: "Abono", con_saldo: 0 },
      { id: 2, glosa: "Cargo", con_saldo: 0 },
      { id: 3, glosa: "Compra", con_saldo: 1 }, //buscar la forma de como mostrar solo con_saldo = 1 en el select
      { id: 4, glosa: "Giro", con_saldo: 1 },
      { id: 101, glosa: "Anula Abono", con_saldo: 0 },
      { id: 102, glosa: "Anula Cargo", con_saldo: 0 },
      { id: 103, glosa: "Anula Compra", con_saldo: 0 },
      { id: 104, glosa: "Anula Giro", con_saldo: 0 }
    ];

    /* this.monedas = [
      { codigo: "CLF", nombre: "Unidad de Fomento", decimales: 4 },
      { codigo: "CLP", nombre: "Peso Chileno", decimales: 0 },
      { codigo: "USD", nombre: "Dólar EEUU", decimales: 2 }
    ]; */
    this.apiService.getComMonedas().subscribe((res) => {
      this.monedas = res;
      console.log(this.monedas);
    });

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

    this.optionsx = [
      { codigo: 1, glosa: "Monto Sobregiro", tipo_dato: 13 }, //rango con decimales
      { codigo: 2, glosa: "Monto Transacción", tipo_dato: 13 }, //rango con decimales
      { codigo: 3, glosa: "Cantidad Cuotas", tipo_dato: 14 }, // rango integer
      { codigo: 4, glosa: "Cantidad Cuotas Tasa 0", tipo_dato: 14 }, // rango integer
      { codigo: 5, glosa: "Tasa Mensual %", tipo_dato: 3 } //decimal
    ];

    this.tipo_parametros = [
      { codigo: 1, glosa: "Monto Sobregiro", tipo_dato: 13, minimo: null, maximo: null, fecha: null, disabled: null },
      { codigo: 2, glosa: "Monto Transacción", tipo_dato: 13, minimo: null, maximo: null, fecha: null, disabled: null },
      { codigo: 3, glosa: "Cantidad Cuotas", tipo_dato: 14, minimo: null, maximo: null, fecha: null, disabled: null },
      { codigo: 4, glosa: "Cantidad Cuotas Tasa 0", tipo_dato: 14, minimo: null, maximo: null, fecha: null, disabled: null }

    ];


    /* this.emi_parametro_transaccion = [
      { id: 37, id_emisor: 1, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 1, valido_desde: "15-06-2019 0:00:00", valor_min: 100.0000, valor_max: 300000.0000 },
      { id: 38, id_emisor: 1, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 2, valido_desde: "14-06-2019 0:00:00", valor_min: 1.0000, valor_max: 6.0000 },
      { id: 39, id_emisor: 1, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 3, valido_desde: "14-06-2019 0:00:00", valor_min: 0.0000, valor_max: 10000000.0000 },
      { id: 41, id_emisor: 1, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 4, valido_desde: "14-06-2019 0:00:00", valor_min: 100.0000, valor_max: null },

      { id: 40, id_emisor: 2, tipo_movimiento: 4, codigo_moneda: "CLP", tipo: 1, valido_desde: "29-05-2019 0:00:00", valor_min: 0.0000, valor_max: 1000000.0000 },
      { id: 42, id_emisor: 2, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 2, valido_desde: "29-05-2019 0:00:00", valor_min: 100.0000, valor_max: 10000000.0000 },
      { id: 44, id_emisor: 2, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 3, valido_desde: "29-05-2019 0:00:00", valor_min: 1.0000, valor_max: 48.0000 },
      { id: 43, id_emisor: 2, tipo_movimiento: 4, codigo_moneda: "CLP", tipo: 2, valido_desde: "29-05-2019 0:00:00", valor_min: 2000.0000, valor_max: 100000.0000 }

    ]; */
    // funciona el servicio.
    this.apiService.getParametroTransacciones().subscribe((res) => {
      this.emi_parametro_transaccion = res; 
      console.log(res);
    });



    function addValor() {
      this.tipo_parametros
      for (let i = 0; i < this.tipo_parametros.length; i++) {
        //const element = this.tipo_parametros[i];
        //this.tipo_parametros[i].push(); 
      }
    }

    this.myGroup = this.fb.group({
      'minimoSobregiro': new FormControl('', Validators.required),
      'maximoSobregiro': new FormControl(''),
      'minimoTransaccion': new FormControl('', Validators.required),
      'maximoTransaccion': new FormControl(''),
      'minimoCuotas': new FormControl('', Validators.required),
      'maximoCuotas': new FormControl(''),
      'minimoTasa': new FormControl('', Validators.required),
      'maximoTasa': new FormControl(''),
      'calendario': new FormControl('', Validators.required),
      'calendario1': new FormControl('', Validators.required),
      'calendario2': new FormControl('', Validators.required),
      'calendario3': new FormControl('', Validators.required)
    });

    let today = new Date();
    let month = today.getMonth(); //6
    let year = today.getFullYear(); //2019
    let day = today.getDay();

    let prevMonth = (month === 0) ? 11 : month + 0;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    //let prevDay = day;
    let nextMonth = (month === 11) ? 0 : 0; // con 0 se puede escoger todo el año.
    let nextYear = (nextMonth === 0) ? year + 2 : year + 1; //año hasta donde puede seleccionar la fecha maxima

    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.minDate.setDate(day + 3);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);


    this.controlTipoDato = [
      { tipo: "int", label: "Máximo", mostrarInput: true },
    ]


    //this.fechaPCalendar = this.arrayFechas();
    this.tipoMovimientoSaldo = this.mostrarConSaldo();
  }


  enviarDato(params) {
    let dato: any;
    dato = params;

  }

  mostrarConsole() {
    console.log("selectOption: " + this.selectOption);
  }
  confirm1() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {
        this.msgs = [{ key: 'myKey1', severity: 'info', summary: 'Confirmado', detail: 'Has aceptado' }];
      },
      reject: () => {
        this.msgs = [{ key: 'myKey2', severity: 'info', summary: 'Rechazado', detail: 'Has rechazado' }];
      }
    });
  }


  showOption(opc) {
    let show: boolean = false;
    for (let i = 0; i < this.options.length; i++) {
      let option = this.options[i];
      if (opc.codigo == option.codigo) {
        show = true;
      }
    }
    return show;
  }

  clearFilter(dropdown1: Dropdown, dropdown2: Dropdown, dropdown3: Dropdown, select: any) {
    dropdown1.resetFilter();
    let nuevo = select[0].glosa;
    console.log(select);
    console.log(nuevo);
  }

  changeOption(select: any) {
    this.optionSelect = select;
  }

  changeDisabledButtonAcept() {
    let cont: number = 0;
    this.tipo_parametros.forEach(elemento => {
      if (elemento.minimo == null) {
        cont++
      }
    });

    if (cont > 0) {
      this.disabledButton = false;
    } else {
      this.disabledButton = true;
    }
  }

  mostrarConSaldo() {
    let tipoMovimientoSaldo: Array<any> = [];
    if (this.tipoMovimientos && this.tipoMovimientos !== null) {

      this.tipoMovimientos.forEach((movimiento: any) => {
        if (movimiento.con_saldo == 1) {
          tipoMovimientoSaldo.push(movimiento);
        }
      });

    } else {
      console.log("no hay tipo movimientos");
    }

    //console.log(tipoMovimientoSaldo);
    return tipoMovimientoSaldo;
  }

  getMarkedDays(date, emisor: any, movimiento: any, moneda: any, tipoParametro: any) {
    //this.fechaPCalendar = this.arrayFechas(emisor, movimiento, moneda);
    let fechaPCalendar = this.arrayFechas(emisor, movimiento, moneda, tipoParametro);
    const dateString = `${date.year.toString()}-${('00' + (date.month + 1).toString()).substr(-2)}-${('00' + date.day.toString()).substr(-2)}`;
    const returnedStatus = fechaPCalendar.indexOf(dateString) > -1 ? true : false;
    /*if (returnedStatus) {
      console.log('... date:', date);
      console.log('... dateString:', dateString);
      console.log('... returnedStatus:', returnedStatus);
    }*/
    return returnedStatus;
  }

  formatDate(dateIn: any) {
    let dateFormat = dateIn.substr(0, 10);
    let day: any = dateFormat.substr(0, 2);
    let month: any = dateFormat.substr(3, 2);
    let year: any = dateFormat.substr(6);
    let dateOut: any = year + "-" + month + "-" + day;
    return dateOut; //yyyy-mm-dd
  }

  formatDatePantalla(dateIn: any) {
    let dateFormat = dateIn.substr(0, 10);
    let day: any = dateFormat.substr(0, 2);
    let month: any = dateFormat.substr(3, 2);
    let year: any = dateFormat.substr(6);
    let dateOut: any = day + "-" + month + "-" + year;
    return dateOut; //dd-mm-yyyy
  }

  formatDateString(dateIn: Date) { // dd/mm/yyyy 0:00:00
    let str: string = dateIn.toLocaleDateString(); // dd/mm/yyyy sin cero a la izq
    let day: any = str.substring(0, str.indexOf("/"));
    let month1 = str.substring(str.indexOf("/") + 1);
    let month = month1.substring(month1.indexOf("/"), -1);
    let year: any = str.substr(5, 4);

    if (parseInt(day) < 10) {
      day = this.zeroFill(day, 2);
    }
    if (parseInt(month) < 10) {
      month = this.zeroFill(month, 2);
    }

    let dateOn: any = day + "-" + month + "-" + year;
    return dateOn;
  }

  zeroFill(number: string, width: number) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // siempre devuelve tipo cadena
  }

  arrayFechas(emisor: any, movimiento: any, moneda: any, tipoParametro: any) {
    let array = new Array();
    this.emi_parametro_transaccion.forEach(param => {
      if (emisor.value.id == param.id_emisor &&
        movimiento.value.id == param.tipo_movimiento &&
        moneda.value.codigo == param.codigo_moneda &&
        param.tipo == tipoParametro.codigo) {

        array.push(this.formatDate(param.valido_desde));
      }
    });
    return array;
  }
  // ----------------------------------------------------------------------------------------
  getCrearFechasCalendar(date, emisor: any, movimiento: any, moneda: any) {
    //this.fechaPCalendar = this.arrayFechas(emisor, movimiento, moneda);
    let fechaPCalendar = this.mostrarFechasCalendar(emisor, movimiento, moneda);
    const dateString = `${date.year.toString()}-${('00' + (date.month + 1).toString()).substr(-2)}-${('00' + date.day.toString()).substr(-2)}`;
    const returnedStatus = fechaPCalendar.indexOf(dateString) > -1 ? true : false;
    return returnedStatus;
  }

  mostrarFechasCalendar(emisor: any, movimiento: any, moneda: any) {
    let array = new Array();
    this.emi_parametro_transaccion.forEach(param => {
      if (emisor.value.id == param.id_emisor &&
        movimiento.value.id == param.tipo_movimiento &&
        moneda.value.codigo == param.codigo_moneda) {

        array.push(this.formatDate(param.valido_desde));
      }
    });
    return array;
  }
  //-------------------------------------------------------------------------------------

  tipoDato(param: any) {
    let tipoDato: string = "int";

    if (param == 14) {
      tipoDato = "int"
    } else if (param == 13) {
      tipoDato = "num"
    } else if (param == 3) {
      tipoDato = "num"
    }

    return tipoDato;
  }

  mostrarMaximo(param: any) {
    return param == 3 ? false : true;
  }

  mostrarLabel(param: any) {
    return param == 3 ? "Valor" : "Mínimo";
  }


  changeFechaCalendar() {

  }
  //@Input() model: DateInputModel;
  @Output() change = new EventEmitter();
  @Output() focus = new EventEmitter();

  onSelect(param: any, emisor: any, movimiento: any, moneda: any) {
    if (param) {
      let today = new Date();
      let stringDate = this.formatDateString(today);
      this.emi_parametro_transaccion.forEach(parametro => {
        let dateFormat = parametro.valido_desde.substr(0, 10);
        if (parametro.tipo == param.codigo &&
          dateFormat == param.fecha &&
          parametro.id_emisor == emisor.value.id &&
          parametro.tipo_movimiento == movimiento.value.id &&
          parametro.codigo_moneda == moneda.value.codigo) {

          param.minimo = parametro.valor_min;
          param.maximo = parametro.valor_max;

          console.log("cumple:" + parametro.tipo + " " + parametro.valido_desde);
        }
        if (param.fecha <= stringDate && param.fecha) {
          this.disabledInput = true;
          param.disabled = true;
        } else { this.disabledInput = false; param.disabled = false; }
      });
    } else {
      console.log("fecha null");
    }
    //this.change.emit(event);
  }

  onFocus() {
    this.focus.emit();
  }

  checkDateForHoliday(date: any) {
    var calendarDate = new Date(date.year, date.month, date.day);
    calendarDate.setHours(0, 0, 0, 0);
    return this.isInArray(calendarDate);
  }

  isInArray(value: Date) {
    return !!this.invalidDates.find(item => {
      return item.getTime() == value.getTime()
    });
  }
  edit: any = { codigo: 0, glosa: "", tipo_dato: 0, minimo: null, maximo: null, fecha: null, disabled: null };
  show(param: any) {
    this.edit = param;
    this.display = true;
  }

  aceptEdit(edit: any) {
    this.emi_parametro_transaccion.forEach(element => {
      if (element.id == edit.id) {
        element.valido_desde = edit.fecha;
        element.valor_min = edit.minimo;
        element.valor_max = edit.maximo;
      }
    });
    this.display = false;
  }

  buscarParametroVigente(emisor: any, movimiento: any, moneda: any) {
    //tener la fecha actual.
    //let fechaActual = new Date();
    let fechaActual: string = "2019-06-14";
    /* this.emi_parametro_transaccion.forEach(e => {
      if(e.id_emisor == emisor.value.id &&
         e.tipo_movimiento == movimiento.value.codigo &&
        e.codigo_moneda == moneda.value.codigo && 
        e.valido_desde == fechaActual {
        
      }
    }); */
  }

  vigentes2: any = [
    { id: 37, id_emisor: 1, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 1, valido_desde: "10-06-2019 0:00:00", valor_min: 100.0000, valor_max: 300000.0000 },
    { id: 38, id_emisor: 1, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 2, valido_desde: "11-06-2019 0:00:00", valor_min: 1.0000, valor_max: 6.0000 },
    { id: 39, id_emisor: 1, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 3, valido_desde: "12-06-2019 0:00:00", valor_min: 0.0000, valor_max: 10000000.0000 },
    { id: 41, id_emisor: 1, tipo_movimiento: 3, codigo_moneda: "CLP", tipo: 4, valido_desde: "13-06-2019 0:00:00", valor_min: 100.0000, valor_max: null }
  ];
  vigentes: any = [ //los que estan activos, se agregan a ese array.
    { codigo: 1, glosa: "Monto Sobregiro", tipo_dato: 13, minimo: 10, maximo: 100000, fecha: "09-06-2019 0:00:00", disabled: false, paramCard: false, hover: false },
      { codigo: 2, glosa: "Monto Transacción", tipo_dato: 13, minimo: 11, maximo: 1111111, fecha: "10-06-2019 0:00:00", disabled: false, paramCard: false, hover: false },
      { codigo: 3, glosa: "Cantidad Cuotas", tipo_dato: 14, minimo: 12, maximo: 1222222, fecha: "11-06-2019 0:00:00", disabled: false, paramCard:false, hover: false },
      { codigo: 4, glosa: "Cantidad Cuotas Tasa 0", tipo_dato: 14, minimo: 15, maximo: 155555, fecha: "12-06-2019 0:00:00", disabled: false, paramCard: false, hover: false }];
  
  mostrarGlosa(id: any) {
    let glosa: string = "";
    this.tipo_parametros.forEach(e => {
      if (e.codigo == id) {
        glosa = e.glosa;
      }
    });
    return glosa;
  }

  searchParam(tipo, min, max) {
    if (tipo) {
      this.paramBusqueda = [];
      if (tipo.codigo && min == null && max == null) {
        this.emi_parametro_transaccion.forEach(e => {
          if (tipo.codigo == e.tipo) {
            this.paramBusqueda.push(e);
          }
        });
      } else if (tipo.codigo && min && max == null) {
        this.emi_parametro_transaccion.forEach(e => {
          if (tipo.codigo == e.tipo && min == e.valor_min) {
            this.paramBusqueda.push(e);
          }
        });
      } else if (tipo.codigo && min == null && max) {
        this.emi_parametro_transaccion.forEach(e => {
          if (tipo.codigo == e.tipo && max == e.valor_min) {
            this.paramBusqueda.push(e);
          }
        });
      } else {
        this.emi_parametro_transaccion.forEach(e => {
          if (tipo.codigo == e.tipo && min == e.valor_min && max == e.valor_max) {
            this.paramBusqueda.push(e);
          }
        });
      }

    }else{
      console.log("error");
    }
  }

editSearchParam(param: any){
  try {
    this.apiService.updateParametroTransaccion(param);
    console.log(param);
  } catch (error) {
    console.log(error);
  }

}

deleteSearchParam(id: any){
  try {
    this.apiService.deleteParametroTransaccion(id);
    console.log(id);
  } catch (error) {
    console.log(error);
  }
}
//{ "id": 39, "id_emisor": 2, "tipo_movimiento": 3, "codigo_moneda": "CLP", "tipo": 1, "valido_desde": "08-06-2019 0:00:00", "valor_min": 0.0000, "valor_max": 10000000.0000 },
agregar:any = false;
buscar:any = false;
vigente:any = true;
buttonDisabledSearch: any = false;
buttonDisabledAdd: any = false;
buttonDisabledVigente: any = false;
showAdd(){
  this.agregar = this.agregar == true ? false : true;
  this.buttonDisabledSearch = this.agregar;
}
showSearch(){
  this.buscar = this.buscar == true ? false : true;
  this.buttonDisabledAdd = this.buscar;
}
showVigente(){
  this.vigente = this.vigente == true ? false : true;
}
paramCard: boolean = true;
paraEditarCard: {codigo: number, glosa: String, tipo_dato: number, minimo: number, maximo: number, fecha: string, disabled: boolean};
editMax: any;
editMin: any;
buttonCardEdit(idEmiParam: number){
  //this.paramCard = false;
  this.vigentes.forEach(e => {
    if(idEmiParam == e.codigo){
      e.paramCard = true;
    }
  });
 /* this.emi_parametro_transaccion.forEach(e => {
    if(e.id == idEmiParam){
      
      this.editMax = e.valor_max;
      this.editMin = e.valor_min;
         this.tipo_parametros.forEach(p => {
          if(p.codigo == e.tipo){
            this.paraEditarCard = p;
          }
        }); 
      
    }
  });*/
}
}//end class
