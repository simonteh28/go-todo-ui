import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTodoComponent } from './create-edit-todo.component';

describe('CreateEditTodoComponent', () => {
  let component: CreateEditTodoComponent;
  let fixture: ComponentFixture<CreateEditTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateEditTodoComponent]
    });
    fixture = TestBed.createComponent(CreateEditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
