import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfilterComponent } from './allfilter.component';

describe('AllfilterComponent', () => {
  let component: AllfilterComponent;
  let fixture: ComponentFixture<AllfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllfilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
