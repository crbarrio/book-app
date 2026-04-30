import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Book } from '../../models/book-interface';
import { BooksService } from '../../services/books-service';
import { BookList } from './book-list';

@Component({
  template: '',
})
class DummyBookDetails {}

const books: Book[] = [
  { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', category: 'Novela' },
  { id: 2, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', category: 'Realismo Mágico' },
];

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookList],
      providers: [
        provideRouter([{ path: 'books/:id', component: DummyBookDetails }]),
        {
          provide: BooksService,
          useValue: {
            getBooks: () => books,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the books returned by the service', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const renderedTitles = Array.from(compiled.querySelectorAll('li span')).map(element => element.textContent?.trim());

    expect(compiled.querySelector('h1')?.textContent).toContain('Listado de libros');
    expect(renderedTitles).toEqual(['El Quijote', 'Cien Años de Soledad']);
  });

  it('should generate a details link for each book', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const detailLinks = Array.from(compiled.querySelectorAll('li a')).map(link => link.getAttribute('href'));

    expect(detailLinks).toEqual(['/books/1', '/books/2']);
  });
});
