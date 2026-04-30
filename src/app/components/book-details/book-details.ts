import { Component, computed, Inject, inject, input } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
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
  private router = inject(Router)

  id = input<string>();
  bookId = computed(() => Number(this.id()));

  bookResource = rxResource<Book, number>({
    params: () => this.bookId(),
    stream: ({ params }) => this.bookService.getBookById(params)
  });

  returnTolist() {
    this.router.navigate(['..', 'books'])
  }
}
