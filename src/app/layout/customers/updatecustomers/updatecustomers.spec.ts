import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatecustomers } from './updatecustomers';

describe('Updatecustomers', () => {
  let component: Updatecustomers;
  let fixture: ComponentFixture<Updatecustomers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updatecustomers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatecustomers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
