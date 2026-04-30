import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { RouterLink } from "@angular/router";
import { rxResource } from '@angular/core/rxjs-interop';
import { Book } from '../../models/book-interface';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  bookService = inject(BooksService)

  bookResource = rxResource<Book[], void>({
    stream: () => this.bookService.getBooks()
  });
}
