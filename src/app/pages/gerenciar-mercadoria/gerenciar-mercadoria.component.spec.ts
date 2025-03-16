import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarMercadoriaComponent } from './gerenciar-mercadoria.component';

describe('GerenciarMercadoriaComponent', () => {
  let component: GerenciarMercadoriaComponent;
  let fixture: ComponentFixture<GerenciarMercadoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarMercadoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarMercadoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
