import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NotFound } from './not-found';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the not found message', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('404');
    expect(compiled.textContent).toContain('Página no encontrada');
    expect(compiled.textContent).toContain('La dirección que buscas no existe.');
  });

  it('should render a link back to the home page', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('a');

    expect(homeLink?.textContent).toContain('Volver al inicio');
    expect(homeLink?.getAttribute('href')).toBe('/');
  });
});
