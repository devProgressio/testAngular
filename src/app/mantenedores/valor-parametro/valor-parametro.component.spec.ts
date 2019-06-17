import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorParametroComponent } from './valor-parametro.component';

describe('ValorParametroComponent', () => {
  let component: ValorParametroComponent;
  let fixture: ComponentFixture<ValorParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
