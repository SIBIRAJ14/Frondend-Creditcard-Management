import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatecards } from './updatecards';

describe('Updatecards', () => {
  let component: Updatecards;
  let fixture: ComponentFixture<Updatecards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updatecards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatecards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
