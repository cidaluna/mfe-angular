import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { IPublisher } from '../publishers/publisher';
import { PublishersService } from '../publishers/publishers.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {
  publishers: IPublisher[] = [];
  dataSourcePublishers = new MatTableDataSource<IPublisher>([]);
  publisherForm!: FormGroup;
  editMode = false;
  isSubmitting = false;
  displayedColumns: string[] = ['name', 'isActive', 'isPartner', 'actions'];

  constructor(
    private _publisherService: PublishersService,
    private _fb: FormBuilder,
    private _coreService: CoreService
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
    const publisherData: IPublisher = this.publisherForm.value;

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

  onEdit(publisher: IPublisher): void {
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
}
