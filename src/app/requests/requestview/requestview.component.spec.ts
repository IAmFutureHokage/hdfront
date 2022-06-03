import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestviewComponent } from './requestview.component';

describe('RequestviewComponent', () => {
  let component: RequestviewComponent;
  let fixture: ComponentFixture<RequestviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
