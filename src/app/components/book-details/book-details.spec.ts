import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { Book } from '../../models/book-interface';
import { BooksService } from '../../services/books-service';
import { BookDetails } from './book-details';

@Component({
  template: '<p>Listado mock</p>',
})
class DummyBookList {}

const booksById = new Map<number, Book>([
  [1, { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', category: 'Novela' }],
  [2, { id: 2, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', category: 'Realismo Mágico' }],
]);

describe('BookDetails', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetails],
      providers: [
        provideRouter([
          { path: 'books', component: DummyBookList },
          { path: 'books/:id', component: BookDetails },
        ]),
        {
          provide: BooksService,
          useValue: {
            getBookById: (bookId: number) => booksById.get(bookId),
          },
        },
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BookDetails);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should render the selected book details from the route id', async () => {
    await harness.navigateByUrl('/books/2', BookDetails);

    expect(harness.routeNativeElement?.textContent).toContain('Cien Años de Soledad');
    expect(harness.routeNativeElement?.textContent).toContain('Gabriel García Márquez');
    expect(harness.routeNativeElement?.textContent).toContain('Realismo Mágico');
  });

  it('should render the empty state when the book does not exist', async () => {
    await harness.navigateByUrl('/books/999', BookDetails);

    expect(harness.routeNativeElement?.textContent).toContain('No hemos podido encontrar el libro.');
  });

  it('should navigate back to the list when clicking the return button', async () => {
    await harness.navigateByUrl('/books/2', BookDetails);

    const button = harness.routeNativeElement?.querySelector('button') as HTMLButtonElement;
    button.click();
    await harness.fixture.whenStable();

    expect(TestBed.inject(Router).url).toBe('/books');
    expect(harness.routeNativeElement?.textContent).toContain('Listado mock');
  });
});
