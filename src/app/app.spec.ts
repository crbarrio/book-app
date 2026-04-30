import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the home route inside the layout', async () => {
    await harness.navigateByUrl('/');

    expect(harness.routeNativeElement?.textContent).toContain('Bienvenido a la biblioteca digital');
    expect(TestBed.createComponent(App).nativeElement.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render the books route', async () => {
    await harness.navigateByUrl('/books');

    expect(harness.routeNativeElement?.textContent).toContain('Listado de libros');
  });
});
