import { Injectable, numberAttribute } from '@angular/core';
import { Book } from '../models/book-interface';

const BOOKS: Book[] = [
  { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', category: 'Novela' },
  { id: 2, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', category: 'Realismo Mágico' },
  { id: 3, title: 'Don Juan Tenorio', author: 'José Zorrilla', category: 'Drama' },
];

@Injectable({
  providedIn: 'root',
})

export class BooksService {
  getBooks(): Book[] {
    return BOOKS;
  }

  getBookById(bookId: number): Book | undefined{
    const selectedBook = BOOKS.find(book => book.id === bookId);
    return selectedBook;
  }


}
