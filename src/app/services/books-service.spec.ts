import { TestBed } from '@angular/core/testing';

import { Book } from '../models/book-interface';
import { BooksService } from './books-service';

describe('BooksService', () => {
  let service: BooksService;
  let books: Book[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksService);
    books = service.getBooks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the seeded list of books', () => {
    expect(books.length).toBe(3);
    expect(books).toEqual([
      { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', category: 'Novela' },
      { id: 2, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', category: 'Realismo Mágico' },
      { id: 3, title: 'Don Juan Tenorio', author: 'José Zorrilla', category: 'Drama' },
    ]);
  });

  it('should return the correct book by id', () => {
    const book = service.getBookById(2);

    expect(book).toEqual({
      id: 2,
      title: 'Cien Años de Soledad',
      author: 'Gabriel García Márquez',
      category: 'Realismo Mágico',
    });
  });

  it('should return undefined for non-existent book id', () => {
    const book = service.getBookById(999);

    expect(book).toBeUndefined();
  });
});
