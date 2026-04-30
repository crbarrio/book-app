import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books-service';
import { RouterLink } from "@angular/router";
import { rxResource } from '@angular/core/rxjs-interop';
import { Book } from '../../models/book-interface';
import { Dialog } from '@angular/cdk/dialog';
import { BookForm, BookFormResult } from '../book-form/book-form';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  templateUrl: './book-list.html',
})
export class BookList {
  bookService = inject(BooksService);
  dialog = inject(Dialog);

  bookResource = rxResource<Book[], void>({
    stream: () => this.bookService.getBooks()
  });

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe({
      next: () => this.bookResource.reload(),
      error: err => console.error('Error borrando', err)
    });
  }

  openModal(bookToEdit?: Book) {
    const dialogRef = this.dialog.open<BookFormResult>(BookForm, {
      disableClose: true,
      data: {
        mode: bookToEdit ? 'edit' : 'add',
        book: bookToEdit
      }
    });

    dialogRef.closed.subscribe(result => {
      if (!result) return;

      if (bookToEdit) {
        this.bookService.updateBook(result as Book).subscribe({
          next: () => this.bookResource.reload(),
          error: err => console.error('Error actualizando', err)
        });
      } else {
        this.bookService.addBook(result as Omit<Book, 'id'>).subscribe({
          next: () => this.bookResource.reload(),
          error: err => console.error('Error añadiendo', err)
        });
      }
    });
  }
}

