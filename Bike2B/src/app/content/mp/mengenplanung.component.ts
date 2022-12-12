import { Component } from '@angular/core';
import {select, Store } from '@ngrx/store';
import { ExportState } from 'src/app/store/export/export.reducer';
import {Order, Orderlist, Sellwish, Production} from 'src/app/model/export.model';
import { addOrderlist } from 'src/app/store/export/export.actions';
import { selectProductionlist } from 'src/app/store/export/export.selector';
import { selectImportWarehousestock } from 'src/app/store/import/import.selector';
import { warehousestock } from 'src/app/model/import.model';
import { ImportState } from 'src/app/store/import/import.reducer';
import { Daten } from 'src/app/daten';
import { browserRefresh } from '../../app.component';
import { Router, TitleStrategy } from '@angular/router';
import { MengenplanInfobuttonComponent } from 'src/app/mp-i/mengenplan-infobutton.component';
import { MatDialog } from '@angular/material/dialog';

class OrderImpl implements Order {
  attr_article: number;
  attr_quantity: number;
  attr_modus: number;

  constructor(attr_article: number, attr_quantity: number, attr_modus: number) {
    this.attr_article = attr_article;
    this.attr_quantity = attr_quantity;
    this.attr_modus = attr_modus;
  }
}

export interface PeriodicElement {
  teilenummer: number;
  lieferfrist: number;
  abweichung: number;
  verwendung_P1: number;
  verwendung_P2: number;
  verwendung_P3: number;
  diskontmenge: number;
  lagerbestand: number;
  bestellmenge: number;
  bedarf_Periode1: number;
  ne: number;
  sicherbestand: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {teilenummer: 21, lieferfrist: 1.8, abweichung: 0.4, verwendung_P1: 1, verwendung_P2: 0, verwendung_P3: 0, diskontmenge: 300, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 22, lieferfrist: 1.7, abweichung: 0.4, verwendung_P1: 0, verwendung_P2: 1, verwendung_P3: 0, diskontmenge: 300, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 23, lieferfrist: 1.2, abweichung: 0.2, verwendung_P1: 0, verwendung_P2: 0, verwendung_P3: 1, diskontmenge: 300, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 24, lieferfrist: 3.2, abweichung: 0.3, verwendung_P1: 7, verwendung_P2: 7, verwendung_P3: 7, diskontmenge: 6100, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 25, lieferfrist: 0.9, abweichung: 0.2, verwendung_P1: 4, verwendung_P2: 4, verwendung_P3: 4, diskontmenge: 3600, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 27, lieferfrist: 0.9, abweichung: 0.2, verwendung_P1: 2, verwendung_P2: 2, verwendung_P3: 2, diskontmenge: 1800, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 28, lieferfrist: 1.7, abweichung: 0.4, verwendung_P1: 4, verwendung_P2: 5, verwendung_P3: 6, diskontmenge: 4500, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 32, lieferfrist: 2.1, abweichung: 0.5, verwendung_P1: 3, verwendung_P2: 3, verwendung_P3: 3, diskontmenge: 2700, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 33, lieferfrist: 1.9, abweichung: 0.5, verwendung_P1: 0, verwendung_P2: 0, verwendung_P3: 2, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0,ne: 0,sicherbestand: 0,},
  {teilenummer: 34, lieferfrist: 1.6, abweichung: 0.3, verwendung_P1: 0, verwendung_P2: 0, verwendung_P3: 72, diskontmenge: 22000, lagerbestand: 0, bedarf_Periode1: 0,bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 35, lieferfrist: 2.2, abweichung: 0.4, verwendung_P1: 4, verwendung_P2: 4, verwendung_P3: 4, diskontmenge: 3600, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 36, lieferfrist: 1.2, abweichung: 0.1, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 37, lieferfrist: 1.5, abweichung: 0.3, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 38, lieferfrist: 1.7, abweichung: 0.4, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 300, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 39, lieferfrist: 1.5, abweichung: 0.3, verwendung_P1: 2, verwendung_P2: 2, verwendung_P3: 2, diskontmenge: 1800, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 40, lieferfrist: 1.7, abweichung: 0.2, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 41, lieferfrist: 0.9, abweichung: 0.2, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 42, lieferfrist: 1.2, abweichung: 0.3, verwendung_P1: 2, verwendung_P2: 2, verwendung_P3: 2, diskontmenge: 1800, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 43, lieferfrist: 2, abweichung: 0.5, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 2700, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 44, lieferfrist: 1, abweichung: 0.2, verwendung_P1: 3, verwendung_P2: 3, verwendung_P3: 3, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 45, lieferfrist: 1.7, abweichung: 0.3, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 46, lieferfrist: 0.9, abweichung: 0.3, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 47, lieferfrist: 1.1, abweichung: 0.1, verwendung_P1: 1, verwendung_P2: 1, verwendung_P3: 1, diskontmenge: 900, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 48, lieferfrist: 1, abweichung: 0.2, verwendung_P1: 2, verwendung_P2: 2, verwendung_P3: 2, diskontmenge: 1800, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 52, lieferfrist: 1.6, abweichung: 0.4, verwendung_P1: 2, verwendung_P2: 0, verwendung_P3: 0, diskontmenge: 600, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 53, lieferfrist: 1.6, abweichung: 0.2, verwendung_P1: 72, verwendung_P2: 0, verwendung_P3: 0, diskontmenge: 22000, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 57, lieferfrist: 1.7, abweichung: 0.3, verwendung_P1: 0, verwendung_P2: 2, verwendung_P3: 0, diskontmenge: 600, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 58, lieferfrist: 1.6, abweichung: 0.5, verwendung_P1: 0, verwendung_P2: 72, verwendung_P3: 0, diskontmenge: 22000, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  {teilenummer: 59, lieferfrist: 0.7, abweichung: 0.2, verwendung_P1: 2, verwendung_P2: 2, verwendung_P3: 2, diskontmenge: 1800, lagerbestand: 0, bedarf_Periode1: 0, bestellmenge: 0, ne: 0,sicherbestand: 0,},
  
];

export interface Prognose {
  artikelnummer: string;
  prog1: number;
  prog2: number;
  prog3: number;
}

const ELEMENT_DATA_PROG: Prognose[] = [
  {artikelnummer: 'P1', prog1: 0, prog2: 0, prog3: 0},
  {artikelnummer: 'P2', prog1: 0, prog2: 0, prog3: 0},
  {artikelnummer: 'P3', prog1: 0, prog2: 0, prog3: 0},
];

const orders: Array<Order> = [];

@Component({
  selector: 'app-mengenplanung',
  templateUrl: './mengenplanung.component.html',
  styleUrls: ['./mengenplanung.component.css']
})
export class MengenplanungComponent {

  warehousestock$ = this.store.pipe(select(selectImportWarehousestock));
  productionlist$ = this.exportstore.pipe(select(selectProductionlist));

  data_warehousestock: warehousestock | undefined;
  data_productionlist: Production[] | undefined;

  constructor(private route: Router, public D: Daten,private store : Store<ImportState>, private exportstore: Store<ExportState>, public dialog: MatDialog){}

  displayedColumns: string[] = ['teilenummer', 'lieferfrist', 'abweichung', 'diskontmenge', 'lagerbestand', 'bedarf_Periode1', 'bestellmenge', 'ne', 'sicherbestand'];
  dataSource = ELEMENT_DATA;
  displayedColumnsProg: string[] = ['artikelnummer', 'prog1', 'prog2', 'prog3',];
  dataSourceProg = ELEMENT_DATA_PROG;

  ngOnInit(){

    if (browserRefresh) {
      this.route.navigate(['/simulation'])
    }
    // Lagerbestand auslesen und in Tabelle eintragen
    this.warehousestock$.subscribe((i) => (this.data_warehousestock = i));
    this.productionlist$.subscribe((i) => (this.data_productionlist = i));
    
    if (this.data_productionlist != undefined ){
      this.calcBedarf(this.data_productionlist);
    }
    
    if(this.data_warehousestock != undefined){
      this.dataSource.forEach(article => {
        this.data_warehousestock!.article.forEach(lager => {
          if(lager.id == article.teilenummer){
              article.lagerbestand = +lager.amount;
          }
        });
      });
    }
    
  }

  //Berechnung Bedarf Periode1
  calcBedarf(data: Production[]) {
     this.dataSource[0].bedarf_Periode1 = data[0].attr_quantity;
     this.dataSource[1].bedarf_Periode1 = data[1].attr_quantity;
     this.dataSource[2].bedarf_Periode1 = data[2].attr_quantity;
     this.dataSource[3].bedarf_Periode1 = data[0].attr_quantity * 1 + data[26].attr_quantity * 1 + data[15].attr_quantity * 1 +
                                          data[25].attr_quantity * 2 + data[24].attr_quantity * 2 + data[1].attr_quantity * 1 +
                                          data[29].attr_quantity * 1 + data[28].attr_quantity * 2 + data[27].attr_quantity * 2 +
                                          data[2].attr_quantity * 1 + data[23].attr_quantity * 1 + data[22].attr_quantity * 2 +
                                          data[21].attr_quantity *2;
    this.dataSource[4].bedarf_Periode1 = data[25].attr_quantity * 2 + data[24].attr_quantity * 2 + data[28].attr_quantity * 2 +
                                         data[27].attr_quantity * 2 + data[22].attr_quantity * 2 + data[21].attr_quantity * 2;
    this.dataSource[5].bedarf_Periode1 = data[0].attr_quantity * 1 + data[1].attr_quantity * 1 + data[2].attr_quantity *1 +
                                         data[26].attr_quantity * 1 + data[29].attr_quantity * 1 + data[23].attr_quantity * 1;
    this.dataSource[6].bedarf_Periode1 = data[15].attr_quantity * 1 + data[17].attr_quantity * 3 + data[18].attr_quantity * 4 +
                                         data[19].attr_quantity * 5;
    this.dataSource[7].bedarf_Periode1 = data[9].attr_quantity * 1 + data[12].attr_quantity * 1 + data[17].attr_quantity *1 +
                                         data[10].attr_quantity * 1 + data[13].attr_quantity * 1 + data[18].attr_quantity * 1 +
                                         data[11].attr_quantity * 1 + data[14].attr_quantity * 1 + data[19].attr_quantity * 1;
    this.dataSource[8].bedarf_Periode1 = data[5].attr_quantity * 1 + data[8].attr_quantity * 1;
    this.dataSource[9].bedarf_Periode1 = data[5].attr_quantity * 36 + data[8].attr_quantity * 36;
    this.dataSource[10].bedarf_Periode1 = data[3].attr_quantity * 2 + data[6].attr_quantity * 2 + data[4].attr_quantity * 2 +
                                         data[7].attr_quantity * 2 + data[5].attr_quantity * 2 + data[8].attr_quantity * 2;
    this.dataSource[11].bedarf_Periode1 = data[3].attr_quantity * 1 + data[4].attr_quantity * 1 + data[5].attr_quantity * 1;
    this.dataSource[12].bedarf_Periode1 = data[6].attr_quantity * 1 + data[7].attr_quantity * 1 + data[8].attr_quantity * 1;
    this.dataSource[13].bedarf_Periode1 = data[6].attr_quantity * 1 + data[7].attr_quantity * 1 + data[8].attr_quantity * 1;
    this.dataSource[14].bedarf_Periode1 = data[9].attr_quantity * 1 + data[12].attr_quantity * 1 + data[10].attr_quantity * 1 +
                                         data[13].attr_quantity * 1 + data[11].attr_quantity * 1 + data[14].attr_quantity * 1;
    this.dataSource[15].bedarf_Periode1 = data[15].attr_quantity;
    this.dataSource[16].bedarf_Periode1 = data[15].attr_quantity;
    this.dataSource[17].bedarf_Periode1 = data[15].attr_quantity ;  
    this.dataSource[18].bedarf_Periode1 = data[16].attr_quantity;
    this.dataSource[19].bedarf_Periode1 = data[16].attr_quantity *1 + data[20].attr_quantity * 2;       
    this.dataSource[20].bedarf_Periode1 = data[16].attr_quantity;        
    this.dataSource[21].bedarf_Periode1 = data[16].attr_quantity; 
    this.dataSource[22].bedarf_Periode1 = data[20].attr_quantity;   
    this.dataSource[23].bedarf_Periode1 = data[20].attr_quantity * 2;           
    this.dataSource[24].bedarf_Periode1 = data[3].attr_quantity *1 + data[6].attr_quantity * 1;
    this.dataSource[25].bedarf_Periode1 = data[3].attr_quantity *36 + data[6].attr_quantity * 36;   
    this.dataSource[26].bedarf_Periode1 = data[4].attr_quantity *1 + data[7].attr_quantity * 1;    
    this.dataSource[27].bedarf_Periode1 = data[4].attr_quantity *36 + data[7].attr_quantity * 36;    
    this.dataSource[28].bedarf_Periode1 = data[17].attr_quantity * 2 + data[18].attr_quantity * 2 + data[19].attr_quantity * 2;   

      this.sicherheitsbestand();
  }

  // bestellung anpassen, um korrekte Werte zu erhalten
  bestellung(newValue: number, teil: number){
    this.dataSource.forEach(i => {
      if(teil == i.teilenummer){
        i.bestellmenge = newValue;
        if(i.bestellmenge != 0 && i.bestellmenge < i.diskontmenge){
          i.bestellmenge = i.diskontmenge;
        }else if(i.bestellmenge != 0 && i.bestellmenge > i.diskontmenge) {
          i.bestellmenge = 2 * i.diskontmenge;
        }
      }
    });
  }

  // bestellung anpassen, um korrekte Werte zu erhalten
  // 4 = Normalbestellung und 5 = Eilbestellung
  bestellart(newValue: string, teil: number){
    this.dataSource.forEach(i => {
      if(teil == i.teilenummer){
        if(newValue == "N"){
          i.ne = 4;
        }else if(newValue == "E"){
          i.ne = 5;
        }
      }
    });
  }

  // Sicherheitsbestand aktualisieren, wenn Prognosen für die kommenden Perioden eingegeben wurde
  sicherheitsbestand(){
    this.dataSource.forEach( i => {
      i.sicherbestand = 1/3 * (i.bedarf_Periode1 * (+i.lieferfrist + +i.abweichung))
      i.sicherbestand = Math.round(i.sicherbestand);
      this.data_warehousestock!.article.forEach(lager => {
        if(lager.id == i.teilenummer){
          if((+lager.amount - +i.bedarf_Periode1) * (+i.lieferfrist + +i.abweichung) <= 0){
            i.bestellmenge = +i.diskontmenge;
            i.ne = 5;
          }
          if((+lager.amount - +i.bedarf_Periode1 * (+i.lieferfrist + +i.abweichung)) <= i.sicherbestand){
            i.bestellmenge = +i.diskontmenge;
            i.ne = 4;
          }
        }
      });
    })
    this.dataSource = [...this.dataSource];
  }

  speichern(){

    this.dataSource.forEach( i => {
      if (i.bestellmenge != 0) {
        const order = new OrderImpl(i.teilenummer, i.bestellmenge, i.ne);
        orders.push(order);
      }
    });
      const orderlist: Orderlist = { order: orders };
      this.exportstore.dispatch(addOrderlist({ orderlist: orderlist }));
    }
  
    openDialog() {
      this.dialog.open(MengenplanInfobuttonComponent);
    }

}
