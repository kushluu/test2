import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmsgsComponent } from './adminmsgs.component';

describe('AdminmsgsComponent', () => {
  let component: AdminmsgsComponent;
  let fixture: ComponentFixture<AdminmsgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmsgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmsgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
