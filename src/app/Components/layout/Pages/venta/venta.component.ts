import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { ProductoService } from 'src/app/Services/producto.service';
import { VentaService } from 'src/app/Services/venta.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

import { Producto } from 'src/app/Interfaces/producto';
import { Venta } from 'src/app/Interfaces/venta';
import { DetalleVenta } from 'src/app/Interfaces/detalle-venta';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  listaProductos:Producto[] =[];
  listaProductosFiltro:Producto[] =[];

  listaProductoVenta:DetalleVenta[] = [];
  bloquearBotonRegistrar:boolean = false

  productoSeleccionado!:Producto;
  tipoPagoPorDefecto:string ='Efectivo';
  totalPagar:number = 0;

  formularioProductoVenta!:FormGroup;
  columnasTabla:string[] =['producto','cantidad','precio','total','accion'];
  detalleVenta = new MatTableDataSource(this.listaProductoVenta);

  retornarProductosPorFiltro(busqueda:any):Producto[]{
    const valorBuscado = typeof busqueda === 'string'? busqueda.toLocaleLowerCase():busqueda.nombre.toLocaleLowerCase();

    return this.listaProductos.filter(item => item.nombre.toLocaleLowerCase().includes(valorBuscado))
  }

  constructor(
    private fb:FormBuilder,
    private _productoServicio:ProductoService,
    private _ventaServicio:VentaService,
    private _utilidadServicio:UtilidadService

  ) {
      this.formularioProductoVenta = this.fb.group({
        producto:['', Validators.required],
        cantidad:['', Validators.required],
      })

      this._productoServicio.lista().subscribe({
        next:(data) =>{
          if (data.status) {
            const lista = data.value as Producto[];
            this.listaProductos = lista.filter(p => p.esActivo == 1 && p.stock > 0);
          }
        },
        error:(e) =>{

        }
      })

      this.formularioProductoVenta.get('producto')?.valueChanges.subscribe(value =>{
        this.listaProductosFiltro = this.retornarProductosPorFiltro(value)
      })
   }

  ngOnInit(): void {
  }

  mostrarProducto(producto:Producto):string{
    return producto.nombre;

  }

  productoParaVenta(event:any){
    this.productoSeleccionado = event.option.value;

  }

  agregarProductoParaVenta(){
    const _cantidad:number =this.formularioProductoVenta.value.cantidad;
    const _precio:number = parseFloat(this.productoSeleccionado.precio);
    const _total:number = _cantidad * _precio;
    this.totalPagar = this.totalPagar + _total;

    this.listaProductoVenta.push({
      idProducto:this.productoSeleccionado.idProducto,
      descripcionProducto:this.productoSeleccionado.nombre,
      cantidad:_cantidad,
      precioTexto:String(_precio.toFixed(2)),
      totalTexto:String(_total.toFixed(2))
    })

    this.detalleVenta = new MatTableDataSource(this.listaProductoVenta);

    this.formularioProductoVenta.patchValue({
      producto:'',
      cantidad:''
    })
  }


  eliminarProducto(detalle:DetalleVenta){
    this.totalPagar = this.totalPagar-parseFloat(detalle.totalTexto)
    this.listaProductoVenta = this.listaProductoVenta.filter(p => p.idProducto != detalle.idProducto)
    this.detalleVenta = new MatTableDataSource(this.listaProductoVenta);
  }

  registarVenta(){
    if (this.listaProductoVenta.length > 0) {
      console.log(this.listaProductoVenta);

      this.bloquearBotonRegistrar = true;

      const request:Venta = {
        tipoPago:this.tipoPagoPorDefecto,
        totalTexto: String(this.totalPagar.toFixed(2)),
        detalleVenta:this.listaProductoVenta
      }
      console.log(request);
      

      this._ventaServicio.registrar(request).subscribe({
        next:(response) => {
          if (response.status) {
            this.totalPagar = 0.00,
            this.listaProductoVenta = [],
            this.detalleVenta = new MatTableDataSource(this.listaProductoVenta);

            Swal.fire({
              icon:'success',
              title:'Venta Registrada',
              text:` Numero de venta: ${response.value.numeroDocumento}`
            })
          }else{
            this._utilidadServicio.mostrarAlerta('No se pudo resitrar la venta', 'Opps')
          }
        },
        complete:()=>{
          this.bloquearBotonRegistrar = false;
        },
        error:(e) => {
          console.log(e);

        }
      })
    }
  }
}
