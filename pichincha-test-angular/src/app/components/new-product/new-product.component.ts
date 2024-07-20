import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-list.service';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [DatePipe],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class NewProductComponent implements OnInit {
  registerForm;
  minDate: any = Date.now();
  date_start: any;
  date_end: any;
  state: any;
  editButton: boolean = false;
  errorMessage: string = '';
  constructor(
    fb: FormBuilder,
    private readonly productService: ProductService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {
    this.state = this.activatedRoute.snapshot.queryParams;
    this.registerForm = fb.group({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl('', Validators.required),
      date_release: new FormControl('', Validators.required),
      date_revision: new FormControl(this.date_end, Validators.required),
    });
    if (this.state) {
      this.editButton = false;
      this.setValueEdit(this.state);
    }
    this.minDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
  }
  //Funcion para setear el segundo input de fecha con respecto al primero, sumando un ano
  onChange(value: any) {
    this.date_start = new Date(value.target.value);
    this.date_start = this.addDays(this.date_start, 1);

    let date_end = this.date_start.setFullYear(
      this.date_start.getFullYear() + 1
    );

    this.date_end = this.datePipe.transform(date_end, 'dd/MM/yyyy');
    this.registerForm.value.date_revision = this.datePipe.transform(
      date_end,
      'yyyy-MM-dd'
    );
  }

  ngOnInit(): void {}


  sendForm() {
    if (this.registerForm) {
      this.productService.addProduct(this.registerForm.value).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          if (error.message === 'Duplicate identifier found in the database') {
            this.modalService.showErrorModal(`El ID ${this.registerForm.value.id} ya se encuentra registrado`);
          } else {
            this.modalService.showErrorModal('An unexpected error occurred');
          }
        }
      );
      this.router.navigateByUrl('/');
    }
  }

  resetForm() {
    this.registerForm.reset();
  }

  setValueEdit(state: any) {
    this.registerForm.controls['id'].setValue(state.id);
    this.registerForm.controls['name'].setValue(state.name);
    this.registerForm.controls['description'].setValue(state.description);
    this.registerForm.controls['logo'].setValue(state.logo);
    this.registerForm.controls['date_release'].setValue(
      this.datePipe.transform(state.date_release, 'yyyy-MM-dd')
    );
    this.registerForm.controls['date_revision'].setValue(
      this.datePipe.transform(state.date_revision, 'dd/MM/yyyy')
    );
  }

  editForm() {
    this.registerForm.value.date_revision =
      this.registerForm.value.date_revision.replaceAll('/', '-');

    this.productService.editProducts(this.registerForm.value).subscribe();
    this.router.navigateByUrl('/');
  }
  //Agregar dias a la fecha
  public addDays(date: any, days: any) {
    return new Date(date.valueOf() + days * 24 * 60 * 60 * 1000);
  }

  backHome() {
    this.router.navigateByUrl('/');
  }

  
  
}