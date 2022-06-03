import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreqComponent } from './editreq.component';

describe('EditreqComponent', () => {
  let component: EditreqComponent;
  let fixture: ComponentFixture<EditreqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditreqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
