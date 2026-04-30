import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books-service';
import { Book } from '../../models/book-interface';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {

  bookService = inject(BooksService);
  private router = inject(Router);

  id = input.required<string>();

  bookResource = rxResource<Book, string>({
    params: () => this.id(),
    stream: ({ params }) => this.bookService.getBookById(params)
  });

  returnTolist() {
    this.router.navigate(['..', 'books'])
  }
}
