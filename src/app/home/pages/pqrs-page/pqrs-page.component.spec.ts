import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsPageComponent } from './pqrs-page.component';

describe('PqrsPageComponent', () => {
  let component: PqrsPageComponent;
  let fixture: ComponentFixture<PqrsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqrsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PqrsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
