import { Component, computed, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { Book } from '../../models/book-interface';

export interface BookFormData {
  mode: 'add' | 'edit';
  book?: Book;
}

export type BookFormResult = Omit<Book, 'id'> | Book;

@Component({
  selector: 'book-form',
  imports: [FormField],
  templateUrl: './book-form.html'
})
export class BookForm {
  private data = inject<BookFormData>(DIALOG_DATA);
  private dialogRef = inject<DialogRef<BookFormResult>>(DialogRef);

  readonly mode = signal<'add' | 'edit'>(this.data.mode);
  readonly formTitle = computed(() => this.mode() === 'add' ? 'Crear nuevo libro' : 'Editar libro');
  readonly buttonText = computed(() => this.mode() === 'add' ? 'Crear' : 'Actualizar');

  bookModel = signal({
    title: this.data.book?.title ?? '',
    author: this.data.book?.author ?? '',
    category: this.data.book?.category ?? ''
  });

  bookForm = form(this.bookModel, (path) => {
    required(path.title, { message: 'El título es obligatorio.' });
    minLength(path.title, 2, { message: 'El título debe tener al menos 2 caracteres.' });
    required(path.author, { message: 'El autor es obligatorio.' });
    minLength(path.author, 2, { message: 'El autor debe tener al menos 2 caracteres.' });
    required(path.category, { message: 'La categoría es obligatoria.' });
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    await submit(this.bookForm, async () => {
      const book = this.bookModel();
      if (this.mode() === 'edit' && this.data.book) {
        this.dialogRef.close({ ...this.data.book, ...book });
      } else {
        this.dialogRef.close(book);
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
