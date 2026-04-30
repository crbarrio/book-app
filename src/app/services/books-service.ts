import { inject, Injectable, numberAttribute } from '@angular/core';
import { Book } from '../models/book-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class BooksService {

  private http = inject(HttpClient);


  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:3000/books`)
  }

  getBookById(bookId: string): Observable<Book>{
    return this.http.get<Book>(`http://localhost:3000/books/${bookId}`)
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/books/${id}`);
  }

  addBook(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(`http://localhost:3000/books`, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`http://localhost:3000/books/${book.id}`, book);
  }

}
