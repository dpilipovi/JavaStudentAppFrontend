import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudijComponent } from './studij.component';

describe('StudijComponent', () => {
  let component: StudijComponent;
  let fixture: ComponentFixture<StudijComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudijComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
