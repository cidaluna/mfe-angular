import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PublishersComponent } from './publishers.component';
import { PublishersService } from './publishers.service';

describe('PublishersService', () => {
  let service: PublishersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublishersService],
      declarations: [PublishersComponent]
    });
    service = TestBed.inject(PublishersService);
    localStorage.clear(); // Limpa o LocalStorage antes de cada teste
  });

  /*
  it('deve retornar uma lista vazia se não houver dados no LocalStorage', () => {
    const publishers = service.getPublishersAll();
    expect(publishers).equal([]);
  });
  */
});
