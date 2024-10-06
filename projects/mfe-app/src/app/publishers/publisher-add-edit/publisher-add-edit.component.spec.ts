import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherAddEditComponent } from './publisher-add-edit.component';

describe('PublisherAddEditComponent', () => {
  let component: PublisherAddEditComponent;
  let fixture: ComponentFixture<PublisherAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherAddEditComponent]
    });
    fixture = TestBed.createComponent(PublisherAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
