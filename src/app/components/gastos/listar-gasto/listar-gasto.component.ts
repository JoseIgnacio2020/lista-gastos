import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresupuestoService } from '../../../services/presupuesto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-gasto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-gasto.component.html',
  styleUrl: './listar-gasto.component.css'
})
export class ListarGastoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  presupuesto: number;
  restante:number;
  listaGastos: any[] = [];

  constructor(private _presupuestoService: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
  this.subscription =  this._presupuestoService.getGastos().subscribe(data => {
      console.log(data);
      this.listaGastos.push(data);
      this.restante = this.restante - data.cantidad;
    });
  }

  ngOnInit(): void {
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;
  }

   ngOnDestroy(): void {
     this.subscription.unsubscribe();
   }

   aplicarColorRestante() {
    if(this.presupuesto / 4 > this.restante) {
      return 'alert alert-danger';
    } else if(this.presupuesto / 2 > this.restante) {
      return 'alert alert-warning'
    } else {
      return 'alert alert-secondary';
    }
  }
}
