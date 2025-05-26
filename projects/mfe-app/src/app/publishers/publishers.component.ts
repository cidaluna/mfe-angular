// Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// MfeApp
import { CoreService } from '@mfe-app/app/core/core.service';
import { Publisher } from '@mfe-app/app/publishers/publisher.interface';
import { PublishersService } from '@mfe-app/app/publishers/publishers.service';
// Angular Material
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-publishers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [PublishersService],
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {
  publishers: Publisher[] = [];
  dataSourcePublishers = new MatTableDataSource<Publisher>([]);
  publisherForm!: FormGroup;
  editMode = false;
  isSubmitting = false;
  displayedColumns: string[] = ['name', 'isActive', 'isPartner', 'actions'];

  constructor(
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _publisherService: PublishersService,
    private readonly _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPublishers();
  }

  initializeForm(): void {
    this.publisherForm = this._fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      isActive: [false],
      isPartner: [false]
    });
  }

  loadPublishers(): void {
    this.publishers = this._publisherService.getPublishersAll();
    this.dataSourcePublishers.data = this.publishers;
  }

  onSubmit(): void {
    if (this.publisherForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const publisherData: Publisher = this.publisherForm.value;

    if (this.editMode) {
      this._publisherService.updatePublisher(publisherData);
      this._coreService.openSnackBar('Editora atualizada com sucesso!', 'Fechar');
    } else {
      this._publisherService.addPublisher(publisherData);
      this._coreService.openSnackBar('Editora adicionada com sucesso!', 'Fechar');
    }

    this.loadPublishers();
    this.clearForm();
    this.isSubmitting = false;
  }

  onEdit(publisher: Publisher): void {
    this.publisherForm.patchValue(publisher);
    this.editMode = true;
  }

  onDelete(id: number): void {
    this._publisherService.deletePublisher(id);
    this.loadPublishers();
    this._coreService.openSnackBar('Editora excluída com sucesso!', 'Fechar');
  }

  clearForm(): void {
    this.publisherForm.reset({ isActive: false, isPartner: false });
    this.editMode = false;
    this.isSubmitting = false;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePublishers.filter = filterValue.trim().toLowerCase();
  }

  backToBooks(){
    this._router.navigate(['books']);
  }
}
