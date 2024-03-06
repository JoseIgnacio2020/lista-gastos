import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingresar-gasto.component.html',
  styleUrl: './ingresar-gasto.component.css'
})
export class IngresarGastoComponent {
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textoIncorrecto: string;

  constructor( private _presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textoIncorrecto = '';

  }

  agregarGasto() {

    if(this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Cantidad ingresada es mayor al restante.';
      return;
    }

    if(this.nombreGasto === ''|| this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Nombre gasto o cantidad incorrecta.';
    } else {

      //Creamos el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad : this.cantidad
      };

      //Enviamos el objeto a los suscriptores via subjet
      this._presupuestoService.agregarGasto(GASTO);

      //Reseteamos formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
