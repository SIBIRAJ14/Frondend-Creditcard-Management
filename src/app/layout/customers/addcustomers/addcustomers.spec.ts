import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcustomers } from './addcustomers';

describe('Addcustomers', () => {
  let component: Addcustomers;
  let fixture: ComponentFixture<Addcustomers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addcustomers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addcustomers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
