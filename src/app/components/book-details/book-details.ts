import { Component, computed, Inject, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { BooksService } from '../../services/books-service';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {

  bookService = inject(BooksService);
  private router = inject(Router)

  bookId = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['id'])
    )
  )

  book = computed( () => this.bookService.getBookById(parseInt(this.bookId())))

  returnTolist() {
    this.router.navigate(['..', 'books'])
  }
}
