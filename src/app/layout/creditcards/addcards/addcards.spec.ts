import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcards } from './addcards';

describe('Addcards', () => {
  let component: Addcards;
  let fixture: ComponentFixture<Addcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addcards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
