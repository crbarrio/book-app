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

  getBookById(bookId: number): Observable<Book>{
    return this.http.get<Book>(`http://localhost:3000/books/${bookId}`)
  }


}
