import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplantsComponent } from './complants.component';

describe('ComplantsComponent', () => {
  let component: ComplantsComponent;
  let fixture: ComponentFixture<ComplantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
