import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from '../../services/presupuesto.service';
import { IngresarGastoComponent } from '../gastos/ingresar-gasto/ingresar-gasto.component';
import { ListarGastoComponent } from '../gastos/listar-gasto/listar-gasto.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [IngresarGastoComponent, ListarGastoComponent],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.css'
})
export class GastosComponent implements OnInit {

  constructor(private _presupuestoService: PresupuestoService, private router: Router) {

  }

  ngOnInit(): void {
    if(this._presupuestoService.presupuesto === 0) {
      this.router.navigate(['/ingresarPresupuesto']);
    }
  }

}
