import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPostComponent } from './listado-post.component';

describe('ListadoPostComponent', () => {
  let component: ListadoPostComponent;
  let fixture: ComponentFixture<ListadoPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
