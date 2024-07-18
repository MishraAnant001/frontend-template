import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransactionsComponent } from './view-transactions.component';

describe('ViewTransactionsComponent', () => {
  let component: ViewTransactionsComponent;
  let fixture: ComponentFixture<ViewTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTransactionsComponent]
    });
    fixture = TestBed.createComponent(ViewTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
