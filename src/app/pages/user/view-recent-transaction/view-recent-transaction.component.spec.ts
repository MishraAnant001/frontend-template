import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecentTransactionComponent } from './view-recent-transaction.component';

describe('ViewRecentTransactionComponent', () => {
  let component: ViewRecentTransactionComponent;
  let fixture: ComponentFixture<ViewRecentTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRecentTransactionComponent]
    });
    fixture = TestBed.createComponent(ViewRecentTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
