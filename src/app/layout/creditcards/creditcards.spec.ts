import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creditcards } from './creditcards';

describe('Creditcards', () => {
  let component: Creditcards;
  let fixture: ComponentFixture<Creditcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creditcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creditcards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
