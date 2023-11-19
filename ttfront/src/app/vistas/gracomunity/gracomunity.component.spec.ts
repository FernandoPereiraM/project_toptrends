import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GracomunityComponent } from './gracomunity.component';

describe('GracomunityComponent', () => {
  let component: GracomunityComponent;
  let fixture: ComponentFixture<GracomunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GracomunityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GracomunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
