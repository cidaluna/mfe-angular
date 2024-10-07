// publisher.service.ts
import { Injectable } from '@angular/core';
import { IPublisher } from '../publishers/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  private localStorageKey = 'publishers';

  constructor() {}

  getPublishersAll(): IPublisher[] {
    const publishersData = localStorage.getItem(this.localStorageKey);
    return publishersData ? JSON.parse(publishersData) : [];
  }

  addPublisher(publisher: IPublisher): void {
    console.log("Entrou service add com: ", publisher);
    const publishers = this.getPublishersAll();
    publisher.id = new Date().getTime(); // Usando timestamp para garantir ID único
    publishers.push(publisher);
    this.updateLocalStorage(publishers);
  }

  updatePublisher(updatedPublisher: IPublisher): void {
    console.log("Entrou service editar com: ", updatedPublisher);
    const pub = this.getPublishersAll();
    const index = pub.findIndex(p => p.id === updatedPublisher.id);
      if (index > -1) {
        pub[index] = updatedPublisher;
        this.updateLocalStorage(pub);
      }
  }

  deletePublisher(id: number): void {
    let publishers = this.getPublishersAll()
    publishers = publishers.filter(p => p.id !== id);
    this.updateLocalStorage(publishers);
  }

  private updateLocalStorage(publishers: IPublisher[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(publishers));
  }
}
