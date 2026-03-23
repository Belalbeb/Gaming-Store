import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusPage } from './contactus-page';

describe('ContactusPage', () => {
  let component: ContactusPage;
  let fixture: ComponentFixture<ContactusPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
