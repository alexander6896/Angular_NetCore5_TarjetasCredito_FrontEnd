import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [];

  accion = 'Agregar';
  id: number | undefined;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.obtenerTarjetas(); //Al iniciar obtener el listado
  }

  //Metodo para obtener el listado
  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(
      (data) => {
        // console.log(data);
        this.listTarjetas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarTarjeta() {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };

    if (this.id == undefined) {
      //Agregamos una nueva tarjeta
      this._tarjetaService.saveTarjet(tarjeta).subscribe(
        (data) => {
          console.log(data);
          this.toastr.success(
            'La tarjeta fue registrada con exito!',
            'Tarjeta registrada'
          );
          this.obtenerTarjetas();
          this.form.reset();
        },
        (error) => {
          this.toastr.error('Opss.. ocurrio un error', 'Error');
          console.log(error);
        }
      );
    } else {
      //Editamos tarjeta
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(
        (data) => {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.toastr.info(
            'La tarjeta fue actualizada con éxito!',
            'Tarjeta Actualizada'
          );
          this.obtenerTarjetas();
        },
        (error) => {
          console.log(console.error);
        }
      );
    }

    // this.listTarjetas.push(tarjeta);

    // console.log(tarjeta);
  }

  eliminarTarjeta(id: number) {
    // console.log(index);
    // this.listTarjetas.splice(index, 1);
    this._tarjetaService.deleteTarjeta(id).subscribe(
      (data) => {
        this.toastr.error(
          'La tarjeta fue eliminada con exito!',
          'Tarjeta eliminada'
        );

        this.obtenerTarjetas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarTarjeta(tarjeta: any) {
    // console.log(tarjeta);
    this.accion = 'Editar';
    this.id = tarjeta.id;
    //Rellenar formulario
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    });
  }
}
