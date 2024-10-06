import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent); // Cria a instância do componente
    component = fixture.componentInstance; // Obtém a instância do componente
    fixture.detectChanges(); // Executa a detecção de mudanças
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title "host-app"', () => {
    expect(component.title).toEqual('host-app');
  });

  it('should change title', () => {
    component.title = 'new-title';
    expect(component.title).toEqual('new-title');
  });

});
